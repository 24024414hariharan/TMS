import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify.types";

import { IUserRepository } from "./src/domain/auth/IUserRepository";
import { UserRepository } from "./src/infrastructure/repositories/UserRepository";
import { ITicketRepository } from "./src/domain/ticket/ITicketRepository";
import { TicketRepository } from "./src/infrastructure/repositories/TicketRepository";

import { LoginUseCase } from "./src/application/auth/LoginUseCase";
import { LogoutUseCase } from "./src/application/auth/LogoutUseCase";

import { CreateTicketUseCase } from "./src/application/ticket/CreateTicketUseCase";
import { ListTicketsUseCase } from "./src/application/ticket/ListTicketsUseCase";
import { GetTicketUseCase } from "./src/application/ticket/GetTicketUseCase";
import { UpdateTicketUseCase } from "./src/application/ticket/UpdateTicketUseCase";
import { DeleteTicketUseCase } from "./src/application/ticket/DeleteTicketUseCase";
import { SearchTicketsUseCase } from "./src/application/ticket/SearchTicketsUseCase";

import { AuthService } from "./src/plugins/auth/AuthService";

import { AuthController } from "./src/interfaces/http/controllers/AuthController";
import { TicketController } from "./src/interfaces/http/controllers/TicketController";

import { ICommentRepository } from "./src/domain/comment/ICommentRepository";
import { CommentRepository } from "./src/infrastructure/repositories/CommentRepository";
import { AddCommentUseCase } from "./src/application/comment/AddCommentUseCase";
import { GetCommentsUseCase } from "./src/application/comment/GetCommentsUseCase";
import { CommentController } from "./src/interfaces/http/controllers/CommentController";

import { IKnowledgeBaseRepository } from "./src/domain/knowledgeBase/IKnowledgeBaseRepository";
import { KnowledgeBaseRepository } from "./src/infrastructure/repositories/KnowledgeBaseRepository";
import { ListArticlesUseCase } from "./src/application/knowledgeBase/ListArticlesUseCase";
import { GetArticleUseCase } from "./src/application/knowledgeBase/GetArticleUseCase";
import { KnowledgeBaseController } from "./src/interfaces/http/controllers/KnowledgeBaseController";

const kernal = new Container();

kernal.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
kernal.bind<AuthService>(TYPES.AuthService).to(AuthService);
kernal.bind<LoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
kernal.bind<LogoutUseCase>(TYPES.LogoutUseCase).to(LogoutUseCase);
kernal.bind<AuthController>(TYPES.AuthController).to(AuthController);

kernal.bind<ITicketRepository>(TYPES.ITicketRepository).to(TicketRepository);
kernal.bind<CreateTicketUseCase>(TYPES.CreateTicketUseCase).to(CreateTicketUseCase);
kernal.bind<ListTicketsUseCase>(TYPES.ListTicketsUseCase).to(ListTicketsUseCase);
kernal.bind<GetTicketUseCase>(TYPES.GetTicketUseCase).to(GetTicketUseCase);
kernal.bind<UpdateTicketUseCase>(TYPES.UpdateTicketUseCase).to(UpdateTicketUseCase);
kernal.bind<DeleteTicketUseCase>(TYPES.DeleteTicketUseCase).to(DeleteTicketUseCase);
kernal.bind<SearchTicketsUseCase>(TYPES.SearchTicketsUseCase).to(SearchTicketsUseCase);
kernal.bind<TicketController>(TYPES.TicketController).to(TicketController);

kernal.bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository);
kernal.bind<AddCommentUseCase>(TYPES.AddCommentUseCase).to(AddCommentUseCase);
kernal.bind<GetCommentsUseCase>(TYPES.GetCommentsUseCase).to(GetCommentsUseCase);
kernal.bind<CommentController>(TYPES.CommentController).to(CommentController);

kernal.bind<IKnowledgeBaseRepository>(TYPES.IKnowledgeBaseRepository).to(KnowledgeBaseRepository);
kernal.bind<ListArticlesUseCase>(TYPES.ListArticlesUseCase).to(ListArticlesUseCase);
kernal.bind<GetArticleUseCase>(TYPES.GetArticleUseCase).to(GetArticleUseCase);
kernal.bind<KnowledgeBaseController>(TYPES.KnowledgeBaseController).to(KnowledgeBaseController);


export { kernal };
