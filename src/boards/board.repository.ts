import { CreateBoardDto } from './dto/create-board.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard({ title, description }: CreateBoardDto) {
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
