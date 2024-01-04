import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProfileDto } from "../dto/profile.dto";
import { getHoroscope } from "../helper/horoscope.helper";
import { Profile } from "../schemas/profil.schema";


@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private readonly profileModel: Model<Profile>) {}
  async createProfile(profileData: ProfileDto, userId: String): Promise<any>{
    const getZodiac = getHoroscope(profileData.birthday)
    const dataProfil = {...profileData, horoscope: getZodiac.horoscope, zodiac: getZodiac.zodiac}
    const newProfile = new this.profileModel({ ...dataProfil, userId })
    return newProfile.save()
  }
  async findById(id: string): Promise<Profile | null> {
    return this.profileModel.findOne({userId : id}).exec()
  }
  async updateProfile(profileData: ProfileDto, userId: String): Promise<any>{
    const getZodiac = getHoroscope(profileData.birthday)
    const dataProfil = {...profileData, horoscope: getZodiac.horoscope, zodiac: getZodiac.zodiac}
    console.log(dataProfil)
    const newProfile = this.profileModel.findOneAndUpdate({userId}, dataProfil)
    return newProfile
  }
}