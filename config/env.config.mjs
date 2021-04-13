export default {
    port: 5000,
    appEndpoint: 'https://localhost:5000',
    apiEndpoint: 'https://localhost:5000',
    jwt_secret: 'th!nk!ng_@b0ut_y0u',
    jwt_expiration: 3000,
    environment: 'dev',
    permissionLevels: {
        'ADMIN': 4101,
        'NORMAL_USER': 1,
        'PAID_USER': 5
    },
    MONGO_URI:'mongodb+srv://allen2020:Afordia2020@allen.fuafk.mongodb.net/blogo?retryWrites=true&w=majority'
}