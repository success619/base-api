"use strict";
import knex from "knex";
const db = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false,
            ca: `-----BEGIN CERTIFICATE-----
        MIIERDCCAqygAwIBAgIUXULv/I3JFX6YyiI7BTUheR8jOSgwDQYJKoZIhvcNAQEM
        BQAwOjE4MDYGA1UEAwwvZDkyYzdmMmUtZDBhMC00YjQ2LTlmMmMtMjdjY2MwOWUz
        OTIzIFByb2plY3QgQ0EwHhcNMjYwNDA5MTEwNjIwWhcNMzYwNDA2MTEwNjIwWjA6
        MTgwNgYDVQQDDC9kOTJjN2YyZS1kMGEwLTRiNDYtOWYyYy0yN2NjYzA5ZTM5MjMg
        UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIaY3His
        m9KmUi5avqg8C31gUZLpG6Rfa2GG72o6Rq9a9AaW1YxCz/r28ZpmB1ew07FhuO1t
        Fgjv+KuU4/vPItCleiM2+vsbhGZeE313EvbA5AYEOR4GhC9LDowkQjLHbZCqjMn1
        eyfVrzSxjyYhMJiIM002ghKnRPFgenmT0/+2vijccSqE6m6246d6Jyne7xhntWwx
        sX+4ttvFc487R4jCNEUBg6LDjA/ixmctATJZ7AhA3wpCWZ6+B4z6TEMlAgNCaWHc
        GetvPOVha1x10ALcAxVrA5eTZbKQwCHplTMuXKSYihpAyoGda0FWQDYUe7hX5V4i
        fahHvjtig8rDiGmNlkfMOZNmXCko6kjgYYjFwLnELWTVMK/OIJ4vRUp160heYwL9
        K/69HoK8TPDxWfnfSkhriD+x4/sQynV9uJx/9oRcUJQtF+i+q72GeJxD6whjepX5
        wXkN4GS0ZWaOdDpAVonmJhqIdadr+v090IiQ+/CeON2mt9VQKkiJJON6LwIDAQAB
        o0IwQDAdBgNVHQ4EFgQUvATWnjoPONN79FYatRhyo7ZqOWMwEgYDVR0TAQH/BAgw
        BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAC+HCLXpmbaD
        NQUzFiRxXFl7UrQ1uxgmaT37PR2UvMzfYrzn8KZ3wQNencmDbptfkBeCLNKpTvy1
        mxxV30/lrc8TF5RcE4BPQf4L1AVDcnC8WPR3idwK97YyKLPSKz+dP9rr8yQD7fxK
        0pjpugWkFKfjACqPzBlAf4aKn0W4TW2pMzrvVOsYM6/FQ61COeKnebpk+etGQT5v
        mXUrPNFuZkAQn4DhY2/PZW+zNe9Z8v6VcgVt8F+wkAr7oPZRoe4DgY119qvPryFW
        Z+rJKVb2Ej1O+8kEoS277Fa1jwIDZIXxK8UyFtTuYKrJ6oVm1rmpi3T19KtLNU6P
        ZsiwiKwK2Vg6GHyC7HxoZSH+BAg9hMTOibI3z1eOkNtUAA1TkaPvVsBXWJHvA4bn
        1t6rvAv8gkIJPNfQJVwjT/PSTxRP9Ct6vvbmNnz9AJhkZECt4EAZs4UWfBd1t53X
        mIQmPYA8yDNEpIf9favOjeO8lvmH4Tu+ETxP5/qIhzh58yvgDoexUQ==
        -----END CERTIFICATE-----`
        },
    },
});
export default db;
