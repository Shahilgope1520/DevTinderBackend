### AuthenticationRouter

Post /auth/login
Post /auth/logout
Post /auth/signup

### ConnectionRequestRouter

Post request/sentRequest/:userId
Post request/acceptRequest/:userId
POST request/rejectRequest/:userID

### userRouter

GET /user/connections
GET /user/requests
GET /user/feed
POST /user/currentLocation

### ProfileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/password

status - pending accepted rejected
