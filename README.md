routes

post/
GET /all/:skip
GET /:id
POST /:id - jwtToken in headers
DELETE /:id - jwtToken in headers
PATCH /:id - jwtToken in headers

comment/
GET /:id --- :id is post id
POST /:id --- :id is postid ---- jwtToken in headers
DELETE /:id --- :id is commentid ---- jwtToken in headers
PATCH /:id --- :id is commentid ---- jwtToken in headers

user/
GET / --- jwtToken in headers -> get all user details
POST /login --- username + password
POST /signup --- username + password

-- user - mail -> generate otp -> then create application with email
-- user - mail + password => return error if user already exists
