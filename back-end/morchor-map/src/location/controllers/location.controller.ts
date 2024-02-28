import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Location } from '../model/location.model';
import { LocationService } from '../services/location.service';
import { CreateLocationDTO } from '../dto/CreateLocation.dto';
import { UpdateLocationDTO } from '../dto/UpdateLocation.dto';
import { AddLocationNameDTO } from '../dto/AddLocationName.dto';
import { SearchLocationDTO } from '../dto/SearchLocation.dto';
import { CategoriesResponseDTO } from '../dto/CategoriesResponse.dto';
import { RoomResponseDTO } from '../dto/RoomResponse.dto';
import { LocationOneNameDTO } from '../dto/LocationOneName.dto';
import { RoutingLocationDTO } from '../dto/RoutingLocation.dto';

@Controller('api/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/test')
  getLocationTest(): string {
    return this.locationService.getLocationTest();
  }

  @Get('/')
  async searchLocaiton(
    @Query() searchLocationDTO: SearchLocationDTO,
  ): Promise<Location[]> {
    return await this.locationService.getLocation(searchLocationDTO);
  }

  @Get('/categories')
  async getAllCategories(): Promise<CategoriesResponseDTO> {
    return await this.locationService.getAllCategories();
  }

  @Get('/rooms/:id')
  async getAllRoomsByLocationName(
    @Param('id') id: string,
  ): Promise<RoomResponseDTO> {
    return await this.locationService.getAllRoomsByLocationName(id);
  }

  @Get('/one-name')
  async getLocationWithOneNameAndLatitudeLongtitude(): Promise<
    LocationOneNameDTO[]
  > {
    return await this.locationService.getLocationsWithOneNameAndLatitudeLongtitude();
  }

  @Post('/add')
  async addLocation(@Body() locationDetails: CreateLocationDTO) {
    return await this.locationService.addLocation(locationDetails);
  }

  @Patch('/:id/update')
  async updateLocation(
    @Param('id') id: string,
    @Body() UpdateLocationDetails: UpdateLocationDTO,
  ) {
    return await this.locationService.updateLocation(id, UpdateLocationDetails);
  }

  @Delete('/:id')
  async deleteLocation(@Param('id') id: string) {
    return await this.locationService.deleteLocation(id);
  }

  @Patch('/:id/add-location-name')
  async addLocationName(
    @Param('id') id: string,
    @Body() nameList: AddLocationNameDTO,
  ) {
    return await this.locationService.addLocationName(id, nameList);
  }
}
