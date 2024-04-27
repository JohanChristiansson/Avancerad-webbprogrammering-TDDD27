import { createContext, useContext } from 'react';
import React, { useState } from 'react';


export class User {
    username: string;


    constructor(username: string) {
        this.username = username;
    }

    setUser(input: string) {
        this.username = input;
    }

    getUser() {
        return this.username;
    }
}