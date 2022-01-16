import dotenv from "dotenv";
import express from "express";
import { from, Observable, of, timer } from "rxjs";
import { concatMap, mergeMap, switchMap, tap } from "rxjs/operators";

// initialize configuration
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world ts!");
});

app.get("/highOrderObsMap", (req, res) => {
  const outterObs$ = from(["A", "B", "C"]);

  const concatObs$ = outterObs$
    .pipe(
      tap((val:string)=> {
        console.log(`source obs: ${val}`);
      }),
      concatMap((item:string) => getItem(item)));

  const mergeObs$ = outterObs$
    .pipe(
      tap((val:string)=> {
        console.log(`source obs: ${val}`);
      }),
      mergeMap((item:string) => getItem(item)));

  const switchObs$ = outterObs$
    .pipe(
      tap((val:string)=> {
        console.log(`source obs: ${val}`);
      }),
      switchMap((item:string) => getItem(item)));


  concatObs$.subscribe((val) => {
    console.log(`concatMap result: ${val}`);
  });

  mergeObs$.subscribe((val) => {
    console.log(`mergeMap result: ${val}`);
  });

  switchObs$.subscribe((val) => {
    console.log(`switchMap result: ${val}`);
  });

  res.send("done");
});



// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

function getItem(item: string): Observable<string> {
  return of(item);
}



