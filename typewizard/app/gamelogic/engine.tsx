'use client'
import internal from "stream";
import React, { useState } from 'react';
import seedrandom from 'seedrandom';


export function getRandomWords(nrOfWords: number, seed: string) {
    const words: string[] = [
        "time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child", 
        "world", "school", "state", "family", "student", "group", "country", "problem", 
        "hand", "part", "place", "case", "week", "company", "system", "program", "question", 
        "work", "government", "number", "night", "point", "home", "water", "room", "mother", 
        "area", "money", "story", "fact", "month", "lot", "right", "study", "book", "eye", 
        "job", "word", "business", "issue", "side", "kind", "head", "house", "service", 
        "friend", "father", "power", "hour", "game", "line", "end", "member", "law", "car", 
        "city", "community", "name", "president", "team", "minute", "idea", "kid", "body", 
        "information", "back", "parent", "face", "others", "level", "office", "door", "health", 
        "person", "art", "war", "history", "party", "result", "change", "morning", "reason", 
        "research", "girl", "guy", "moment", "air", "teacher", "force", "education"
    ];

    const randomWords: string[] = [];
    //const rng = seedrandom(seed); // Seeded random number generator
    const wordsLength: number = words.length;

    while (randomWords.length < nrOfWords) {
        // Generate a random index using the seeded random number generator
        //const randomIndex: number = Math.floor(rng() * wordsLength);
        const randomIndex: number = Math.floor(Math.random() * words.length);
        const randomWord: string = words[randomIndex];

        // Avoid duplicates
        if (!randomWords.includes(randomWord)) {
            randomWords.push(randomWord);
        }
    }

    return randomWords;
}



