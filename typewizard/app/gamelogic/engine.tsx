'use client'
import internal from "stream";
import React, { useState } from 'react';
//import seedrandom from 'seedrandom';


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

    const words2: string[] = [
        "och", "att", "det", "som", "en", "på", "är", "av", "för", "med", "till", "den", "har", "de", "inte", "om", "ett", "han", "men",
        "var", "jag", "sig", "från", "vi", "så", "kan", "man", "när", "år", "säger", "hon", "under", "också", "efter", "eller", "nu", "sin", "där", "vid",
        "mot", "ska", "skulle", "kommer", "ut", "får", "finns", "vara", "hade", "alla", "andra", "mycket", "än", "här", "då", "sedan", "över", "bara", "in", "blir",
        "upp", "även", "vad", "få", "två", "vill", "ha", "många", "hur", "mer", "går", "sverige", "kronor", "detta", "nya", "procent", "skall", "hans", "utan", "sina",
        "något", "svenska", "allt", "första", "fick", "måste", "mellan", "blev", "bli", "dag", "någon", "några", "sitt", "stora", "varit", "dem", "bland", "bra", "tre",
        "ta", "genom", "del", "hela", "annat", "fram", "gör", "ingen", "stockholm", "göra", "enligt", "mig", "redan", "inom", "kom", "du", "helt", "ju", "samma", "kanske",
        "själv", "oss", "tidigare", "se", "miljoner", "dock", "denna", "både", "tid", "kunna", "fått", "stor", "olika", "ser", "flera", "plats", "kunde", "gå",
        "ur", "gäller", "honom", "aldrig", "barn", "varje", "lite", "sätt", "just", "väl", "tar", "åt", "mest", "per", "står", "fem", "tror", "rätt", "dessa", "gång",
        "därför", "fyra", "ny", "gick", "hos", "dessutom", "ger", "lika", "eftersom", "vilket", "trots", "tycker", "människor", "ligger", "vet", "kvar", "bättre", "gjorde", "ändå",
        "inför", "regeringen", "senaste", "samtidigt", "annan", "ännu", "blivit", "fall", "talet", "exempel", "gamla", "deras", "tiden", "min", "hennes", "sista", "komma", "större", "visar"
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



