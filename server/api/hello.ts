import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if(!query.chapterNo || !query.verseNo) {
        return {
            error: 'chapterNo and verseNo are required'
        }
    }
    //number of shlokas in each chapter of bhagwad gita
    const url = `https://vedabase.io/en/library/bg/${query.chapterNo}/${query.verseNo}/`;

    const body = await $fetch<string>(url);
    let $ = cheerio.load(body);
    
    let no = $('title').text();
    let devanagri = $('.wrapper-devanagari').text();
    let verse = $('.wrapper-verse-text').text();
    let synonyms = $('.wrapper-synonyms').text();
    let translation = $('.wrapper-translation').text();
    let purport = $('.wrapper-puport').text();



    return {
        no,
        devanagri,
        verse,
        synonyms,
        translation,
        purport
    }
  })
  