import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getAllBoards() {
    return this.boardRepository.find();
  }

  async getBoardById(id: number) {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return result;
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  //   getAllBoards() {
  //     return this.boards;
  //   }
  //   createBoard({ title, description }: CreateBoardDto) {
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  //   getBoardById(id: string) {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Can't find board with id ${id}`);
  //     }
  //     return found;
  //   }
  //   deleteBoard(id: string) {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }
  //   updateBoardStatus(id: string, status: BoardStatus) {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
