import { ImageSourcePropType } from "react-native";

export interface Banner {
    id:number;
    ImgSrc:ImageSourcePropType
}


export const banners: Banner[] =[
    {
        id: 1,
        ImgSrc: require('@/assets/images/banner_1.jpg')
    },
    {
        id: 2,
        ImgSrc: require('@/assets/images/banner_2.jpg')
    },
    {
        id: 3,
        ImgSrc: require('@/assets/images/banner_3.jpg')
    },
    {
        id: 4,
        ImgSrc: require('@/assets/images/banner_4.jpg')
    },
    {
        id: 5,
        ImgSrc: require('@/assets/images/banner_5.jpg')
    },
]