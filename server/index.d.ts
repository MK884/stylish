interface IUser {
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
    avatarUrl?:string;
    refreshToken?:string;
    // isPasswordCorrect: (password:string) => Promise<boolean>;
    // generateAccessToken: Function;
    // generateRefreshToken: Function;
}

interface UserToken {
    _id:string;
    email:string;
}