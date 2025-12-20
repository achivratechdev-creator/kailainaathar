export default (theFunc) => (req, res, next) => { // <--- FIXED
  Promise.resolve(theFunc(req, res, next)).catch(next);
};