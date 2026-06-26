import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from 'generated/prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // const product = await this.prisma.pruduct.create({
    //   data: createProductDto,
    // });
    // return product;
    return this.prisma.pruduct.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.prisma.pruduct.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalPages / limit); //redondea al siguiente numero positivo
    return {
      data: await this.prisma.pruduct.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true,
        },
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.pruduct.findFirst({
      where: { id, available: true },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto;
    await this.findOne(id);
    return this.prisma.pruduct.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    // return this.prisma.pruduct.delete({
    //   where: { id },
    // });
    const product = await this.prisma.pruduct.update({
      where: { id },
      data: {
        available: false,
      },
    });
    return product;
  }
}
