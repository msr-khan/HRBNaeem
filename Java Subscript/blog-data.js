/**
 * MASTER BLOG DATABASE
 * Use this file to add, edit, or remove blogs from your website.
 * Follow the format below for each new entry.
 */

const blogDatabase = [
    {
        id: 1, // Unique ID for each blog (1, 2, 3...)
        title: "نماز کا مکمل طریقہ", // The main title shown on the card
        tags: "namaz ka tarika, prayer method, how to pray, salat, salah", // SMART SEARCH KEYWORDS (Roman, English, Urdu)
        image: "imag/namaz.jpg", // Path to your blog image
        summary: "بچوں اور بڑوں کے لیے سنت کے مطابق نماز کا مکمل طریقہ یہاں پڑھیں۔", // Short description for the homepage
        content: `
            نماز دین کا ستون ہے۔ یہاں آپ کا مکمل تفصیلی مضمون آئے گا۔
            آپ اس میں جتنی چاہیں لائنیں لکھ سکتے ہیں۔ 
            یہ حصہ 'post.html' پر نظر آئے گا۔
        `, // The full article content
        date: "2026-02-04" // Date of posting
    },
    {
        id: 2,
        title: "رمضان کے فضائل",
        tags: "roza, ramzan, ramadan, fasting, sawm, ramzan ke masail",
        image: "imag/baner.jpg",
        summary: "روزہ رکھنے کی فضیلت اور اس کے ضروری مسائل پر ایک جامع مضمون۔",
        content: `
            روزہ اسلام کا چوتھا رکن ہے۔ رمضان المبارک برکتوں والا مہینہ ہے۔
            اس میں سحری اور افطاری کے مسائل درج ذیل ہیں...
        `,
        date: "2026-02-04"
    },

     {
        id: 3,
        title: "رمضان کے فضائل",
        tags: "roza, ramzan, ramadan, fasting, sawm, ramzan ke masail",
        image: "imag/baner.jpg",
        summary: "روزہ رکھنے کی فضیلت اور اس کے ضروری مسائل پر ایک جامع مضمون۔",
        content: `
            روزہ اسلام کا چوتھا رکن ہے۔ رمضان المبارک برکتوں والا مہینہ ہے۔
            اس میں سحری اور افطاری کے مسائل درج ذیل ہیں...
        `,
        date: "2026-02-04"
    }
    // To add a new blog, just copy the block above and paste it here!
];
