import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }
  
  public async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async findAll() {
    return `This action returns all pokemon`;
  }

  public async findOne(term: string): Promise<Pokemon | null> {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    if(!pokemon && isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    if(!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    if(!pokemon) throw new NotFoundException(`Pokemon whit term ${term} not found`);
    
    return pokemon;
  }

  public async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    if (!pokemon) throw new NotFoundException(`Pokemon whit term ${term} not found`);

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async remove(id: string) {
    // const pokemon = await this.findOne(id);

    // if (!pokemon) throw new NotFoundException(`Pokemon whit term ${id} not found`);

    // await pokemon.deleteOne();

    const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new BadRequestException(`Pokemon whit term ${id} not found`);
    
    return 'Pokemon deleted successfully';
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) throw new BadRequestException('Pokemon already exists in the database');

    console.log(error);

    throw new InternalServerErrorException('Error creating pokemon in Database, try again please');
  }
}
