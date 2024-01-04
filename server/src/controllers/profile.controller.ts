import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ProfileDto } from "../dto/profile.dto";
import { ProfileService } from "../services/profile.service";


@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  async createProfile(@Body() createProfileDto: ProfileDto, @Res() res, @Req() req) : Promise<void> {
    try {
      const userID = req.userId
      console.log(userID)
      const checkExistingProfile = await this.profileService.findById(userID)
      if(checkExistingProfile){
        throw {message: "Profile in exist"}
      }
      const newProfile = await this.profileService.createProfile(createProfileDto, userID)
      res.status(HttpStatus.CREATED).json({message: "Profile has been created",newProfile})
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
  @Get('getProfile')
  async getProfile(@Res() res, @Req() req) {
    try {
      const userID = req.userId
      const profile = await this.profileService.findById(userID)
      res.status(HttpStatus.OK).json({message: "Profile has been found", profile})
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(error)
    }
  }
  @Put('updateProfile')
  async updateProfile(@Body() updateDataProfileDto: ProfileDto, @Res() res, @Req() req): Promise<void> {
    try {
      const userID = req.userId
      const updateProfile = await this.profileService.updateProfile(updateDataProfileDto, userID)
      res.status(HttpStatus.OK).json({message: "Profile has been updated",updateProfile})
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(error)
    }
  }

}