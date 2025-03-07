import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewTickets.css";

export interface Ticket {
  id: number;
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Closed";
}

export interface Comment {
  id: number;
  text: string;
  author: { role: string };
  createdAt: string;
}

const ViewTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<Ticket["priority"]>("Low");

  const userRole = localStorage.getItem("role") || "user";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${process.env.DOMAIN}/tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.DOMAIN}/tickets/search?query=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Error searching tickets:", error);
    }
  };

  const openTicketDetails = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    try {
      const response = await axios.get(
        `${process.env.DOMAIN}/tickets/${ticket.id}/comments`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;
    try {
      await axios.post(
        `${process.env.DOMAIN}/tickets/${selectedTicket.id}/comments`,
        { text: newComment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNewComment("");
      openTicketDetails(selectedTicket);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteTicket = async () => {
    if (!selectedTicket) return;
    try {
      await axios.delete(
        `${process.env.DOMAIN}/tickets/${selectedTicket.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSelectedTicket(null);
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const handleStatusChange = async (newStatus: Ticket["status"]) => {
    if (!selectedTicket) return;
    try {
      await axios.put(
        `${process.env.DOMAIN}/tickets/${selectedTicket.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSelectedTicket({ ...selectedTicket, status: newStatus });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update ticket status.");
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.DOMAIN}/tickets`,
        {
          subject: newSubject,
          description: newDescription,
          priority: newPriority,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowCreateModal(false);
      setNewSubject("");
      setNewDescription("");
      setNewPriority("Low");
      fetchTickets();
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="top-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {(userRole === "user" || userRole === "agent") && (
          <button
            className="create-ticket-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Ticket
          </button>
        )}
      </div>

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-card"
            onClick={() => openTicketDetails(ticket)}
          >
            <h3>{ticket.subject}</h3>
            <p>{ticket.description}</p>
            <div>
              <span>{ticket.priority}</span>
              <span>{ticket.status}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedTicket.subject}</h2>
            <p>{selectedTicket.description}</p>
            <p>Priority: {selectedTicket.priority}</p>
            <p>
              Status:{" "}
              {userRole === "agent" ? (
                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value as Ticket["status"])
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              ) : (
                selectedTicket.status
              )}
            </p>

            <h3>Comments:</h3>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <small>{comment.author.role} • {new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))}

            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit">Submit Comment</button>
            </form>

            {userRole === "agent" && (
              <button onClick={handleDeleteTicket}>Delete Ticket</button>
            )}
            <button onClick={() => setSelectedTicket(null)}>Close</button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Ticket</h2>
            <form onSubmit={handleCreateTicket}>
              <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="Subject" required />
              <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" required />
              <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as Ticket["priority"])}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button type="submit">Create</button>
            </form>
            <button onClick={() => setShowCreateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTickets;
