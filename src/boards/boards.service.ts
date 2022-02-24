import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './board.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard({ title, description }: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string) {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return found;
  }

  deleteBoard(id: string) {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
