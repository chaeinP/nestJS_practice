import { User } from './../auth/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard({ title, description }: CreateBoardDto, user: User) {
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
