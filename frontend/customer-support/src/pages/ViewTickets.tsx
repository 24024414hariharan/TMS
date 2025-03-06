import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewTickets.css";

export interface Ticket {
  id: number;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
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
  const userRole = localStorage.getItem("role") || "user";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tickets", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      const validTickets = response.data.map((ticket: Ticket) => ({
        ...ticket,
        priority: ['Low', 'Medium', 'High'].includes(ticket.priority)
          ? ticket.priority
          : 'Low',
        status: ['Open', 'In Progress', 'Closed'].includes(ticket.status)
          ? ticket.status
          : 'Open'
      }));
      
      setTickets(validTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/tickets/search?query=${searchQuery}`,
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
        `http://localhost:4000/tickets/${ticket.id}/comments`,
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
        `http://localhost:4000/tickets/${selectedTicket.id}/comments`,
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

  const renderPriorityBadge = (priority: Ticket['priority']) => {
    return <span className={`ticket-priority ticket-priority-${priority.toLowerCase()}`}>{priority}</span>;
  };

  const renderStatusBadge = (status: Ticket['status']) => {
    return <span className={`ticket-status ticket-status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="top-bar">
        <div className="top-controls">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <button className="create-ticket-btn">+ Create Ticket</button>
        </div>
      </div>
      
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="ticket-card"
            onClick={() => openTicketDetails(ticket)}
          >
            <h3>{ticket.subject || 'Untitled Ticket'}</h3>
            <p>{ticket.description || 'No description provided'}</p>
            <div>
              {renderPriorityBadge(ticket.priority)}
              {renderStatusBadge(ticket.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedTicket.subject}</h2>
            <p>{selectedTicket.description}</p>
            <p>Priority: {selectedTicket.priority}</p>
            <p>Status: {selectedTicket.status}</p>

            <h3>Comments:</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.text}</p>
                  <small>
                    {comment.author.role} • {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}

            <form onSubmit={handleAddComment}>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button type="submit">Submit Comment</button>
            </form>

            <button className="close-modal" onClick={() => setSelectedTicket(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTickets;