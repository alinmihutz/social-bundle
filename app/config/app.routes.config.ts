export const API_CONFIG = {
    host: 'http://10.182.20.177:8000',
    routes: {
        socialLogin: '/api/{provider}/auth/url',
        socialMediaFeeds: '/api/{provider}/{accessToken}/feeds',
        user: '/api/{provider}/user',
        login: '/api/login',
        signin: '/api/signin',
        message: '/api/{provider}/publish/message',
        facebook: {
            feeds: '/api/facebook/feeds?token={token}',
            posts: '/api/facebook/posts',
            events: '/api/facebook/events?access_token={access_token}&type=event&lng={lng}&lat={lat}&distance={distance}&limit={limit}'
        },
        instagram: {
            user_media: '/api/instagram/user/media?token={token}'
        }
    }
};