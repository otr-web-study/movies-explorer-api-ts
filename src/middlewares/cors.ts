import { Request, Response, NextFunction } from 'express';

const cors = (req: Request, res: Response, next: NextFunction) => {
  const allowedCors = [
    'https://otrdiplom.nomoredomains.sbs',
    'http://otrdiplom.nomoredomains.sbs',
    'http://localhost:3001',
  ];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (origin && allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

export default cors;
