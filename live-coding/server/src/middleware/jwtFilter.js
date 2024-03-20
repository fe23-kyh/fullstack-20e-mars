import jwtUtils from "../util/jwtUtils.js";

function authorize(req, resp, next) {

  const bearer = req.headers["authorization"];

  try {
    if(bearer == undefined) {
      return resp.status(400).send({err: "Bad authorization header"});
    }
    
    const token = jwtUtils.verify(bearer.split(" ")[1]);

    if(this?.role && this.role != token.role) {
      return resp.status(401).send({err: "User role is not high enough"});
    } 

    resp.locals.token = token;

  } catch(err) {
    console.log(err);
    if(err.name == "JsonWebTokenError") {
      return resp.status(400).send({err: "Invalid authorization signature"});
    } else if (err.name == "TokenExpiredError") {
      return resp.status(400).send({err: "Authorization token expired"});
    }
  }

  next();
}

export default { authorize }