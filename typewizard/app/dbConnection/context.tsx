import { createContext, useContext } from 'react';
import React, { useState } from 'react';


export class User {
    username: string;
    loggedIn: boolean;


    constructor(username: string, loggedIn: boolean) {
        this.username = username;
        this.loggedIn = loggedIn;
    }

    setUser(input: string) {
        this.username = input;
    }

    getUser() {
        return this.username;
    }
}

export const currentUser = new User("null", false);


