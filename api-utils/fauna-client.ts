import faunadb from "faunadb";

export default new faunadb.Client({ secret: process.env.FAUNADB_APIKEY });
