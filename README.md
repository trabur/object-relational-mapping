OBJECT RELATIONAL MAPPING
========
this framework focuses on the fundamental APIs for running modern, 
flexible, and performant web apps.

- channels utilize websockets so they work in JavaScript and node.js
- channels have an unlimited amount of rooms
- channel users in room #1337 may only see messages for room #1337
- channels allow users to be in multiple rooms such as #5280 and #2020

- there are four perfectly squared houses each with 4 bedrooms.
- the houses are $Z, $N, $U, etc... with bedrooms #1, #2, #3, etc...

```md
ZZZZZZZZZZZZZ NNNNNNNNNNNNN UUUUUUUUUUUUU CCCCCCCCCCCCC
+-----------+ +-----------+ +-----------+ +-----------+
|  1  |  2  | |  6  |  8  | |  9  |  12 | |  14 |  13 |
+-----------+ +-----------+ +-----------+ +-----------+
|  3  |  4  | |  5  |  7  | |  10 |  11 | |  15 |  16 |
+-----------+ +-----------+ +-----------+ +-----------+
ZZZZZZZZZZZZZ NNNNNNNNNNNNN UUUUUUUUUUUUU CCCCCCCCCCCCC
```

- the path of the letter when drawn reflects the front and back door of each house.
- such that it takes time to get from point to point.

```md
      Z             N             U             C
    start         start         start         start
+-----------+ +-----------+ +-----------+ +-----------+
|  F  |     | |     |  B  | |  F  |  B  | |     |  F  |
+-----------+ +-----------+ +-----------+ +-----------+
|     |  B  | |  F  |     | |     |     | |     |  B  |
+-----------+ +-----------+ +-----------+ +-----------+
     end           end           end           end
      Z             N             U             C
```

- let's say house $Z and $N take 3.5 seconds to build.
- let's say house $U and $C take 3 seconds to build.
- markings ::: diagonal: 1.5, strait: 1, jump: 0.25

```md
Z(3.5)                              = 3.5 seconds
Z(3.5) ... N(3.5)                   = 7.25 seconds
Z(3.5) ... N(3.5) ... U(3)          = 10.5 seconds
Z(3.5) ... N(3.5) ... U(3) ... C(3) = 13 seconds
```

- in such a system: how can multiple users remain secure from one another?
- first with numerator and denominator logic we can define dependancies.
- PING and CRON depend on ZNUC logic; such that: PING/ZNUC and CRON/ZNUC.





### production goals
> elixir production: https://printedbasics.gigalixirapp.com/
> node.js production: http://app.printedbasics.com
> node.js production: http://localhost:3000

consensus RAFT between multiple node.js apps:
- https://github.com/unshiftio/liferaft

access Prisma commands over Phoenix channels:
- https://github.com/prisma/prisma
- https://hexdocs.pm/phoenix/js/#phoenix

Usernames and Passwords sync with Postgresql:
- https://www.npmjs.com/package/pbkdf2
- https://jwt.io/


### developer documents
make changes at `schema.prisma` then run `npx prisma migrate dev --preview-feature`