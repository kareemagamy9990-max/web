// EgyGulf Foods — site content. Edited from /admin.html; you can also edit by hand.
const SITE_DATA = {
  "settings": {
    "siteUrl": "https://www.egygulf-foods.com",
    "email": "export@egygulf-foods.com",
    "phones": [
      "01099281170",
      "01222574360"
    ],
    "whatsapp": "",
    "facebook": "https://www.facebook.com/egygulffoods",
    "instagram": "https://www.instagram.com/egygulffoods/",
    "linkedin": "https://www.linkedin.com/company/102147127/",
    "youtube": "",
    "tiktok": "",
    "x": "",
    "formEndpoint": "https://formspree.io/f/maewjkel",
    "offersSheetUrl": "https://script.google.com/macros/s/AKfycbw0D_RwlwOS64AAtHT4IecBWQNpLYmrI2b4p_E4ApAWXEwdnegMgIY1TNGVBSFL0gRx2A/exec"
  },
  "images": {
    "heroMosaic": "images/products-mosaic-hd.webp",
    "snacksMosaic": "images/snacks-mosaic.webp",
    "candyMosaic": "images/candy-lineup-v4.webp",
    "aboutImage": "images/logo.png",
    "chairmanPhoto": "",
    "expoVideo": "images/videos/expo-booth.mp4"
  },
  "stats": [
    {
      "value": "2004",
      "label": {
        "ar": "سنة التأسيس",
        "en": "Founded"
      }
    },
    {
      "value": "9",
      "label": {
        "ar": "خطوط إنتاج",
        "en": "Production lines"
      }
    },
    {
      "value": "9",
      "label": {
        "ar": "علامات تجارية",
        "en": "House brands"
      }
    },
    {
      "value": "40",
      "label": {
        "ar": "دولة تصدير",
        "en": "Export countries"
      }
    }
  ],
  "events": [
    {
      "image": "images/events/expo-2026-visitors.webp",
      "banner": false,
      "position": "center 35%",
      "title": {
        "ar": "إيجي جالف فودز في معرض فود أفريقيا",
        "en": "EgyGulf Foods at Food Africa"
      },
      "sub": {
        "ar": "زوار وتجار بيتذوقوا منتجاتنا ويتعرفوا على علاماتنا",
        "en": "Visitors and traders tasting our products and meeting our brands"
      },
      "link": ""
    },
    {
      "image": "images/events/expo-2026-brochures.webp",
      "banner": false,
      "position": "center 45%",
      "title": {
        "ar": "موجو وشيل آوت بين إيدين الزوار",
        "en": "Mojo and ChillOut in visitors' hands"
      },
      "sub": {
        "ar": "كتالوج علاماتنا ومنتجاتنا الجديدة في معرض فود أفريقيا",
        "en": "Our brand catalogue and newest products at Food Africa"
      },
      "link": ""
    },
    {
      "image": "images/events/expo-2026-alnahar-interview.webp",
      "banner": false,
      "position": "center 25%",
      "title": {
        "ar": "لقاء مع قناة النهار",
        "en": "Interview with Al Nahar TV"
      },
      "sub": {
        "ar": "من داخل جناح الشركة في معرض فود أفريقيا",
        "en": "From inside our booth at Food Africa"
      },
      "link": ""
    },
    {
      "image": "images/events/expo-2026-team.webp",
      "banner": false,
      "position": "center 30%",
      "title": {
        "ar": "فريقنا في استقبالكم",
        "en": "Our team, ready to welcome you"
      },
      "sub": {
        "ar": "استقبال الزوار وطلبات التعاون والتصدير في معرض فود أفريقيا",
        "en": "Welcoming visitors and partnership requests at Food Africa"
      },
      "link": ""
    }
  ],
  "brands": [
    {
      "key": "chillout",
      "category": "snacks",
      "color": "#2E2A74",
      "init": {
        "ar": "C",
        "en": "C"
      },
      "logo": "images/brands/chillout.webp",
      "name": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "desc": {
        "ar": "سناكس وشيبس مخبوز غير مقلي: أوت شيبس، فاير فينجرز، بوفس، فشار جورميه، وسوداني مغطى — بـ70% دهون أقل.",
        "en": "Baked, never-fried snacks: oat chips, fire fingers, puffs, gourmet popcorn and coated peanuts — 70% less fat."
      },
      "tag": {
        "ar": "سناكس وشيبس",
        "en": "Snacks & Chips"
      }
    },
    {
      "key": "special",
      "category": "snacks",
      "color": "#C0392B",
      "init": {
        "ar": "S",
        "en": "S"
      },
      "logo": "images/special.webp",
      "name": {
        "ar": "سبيشيال",
        "en": "Special"
      },
      "desc": {
        "ar": "بافس مقرمشة بنكهات متنوعة، تعبئة أكياس بأحجام مختلفة تناسب أي رف بيع.",
        "en": "Crunchy puffs in a range of flavours, bagged in multiple sizes for any shelf."
      },
      "tag": {
        "ar": "بافس",
        "en": "Puffs"
      }
    },
    {
      "key": "bozo",
      "hidden": true,
      "category": "snacks",
      "color": "#14123B",
      "init": {
        "ar": "B",
        "en": "B"
      },
      "logo": "images/bravo.webp",
      "name": {
        "ar": "بوزو",
        "en": "Bozo"
      },
      "desc": {
        "ar": "بافس بنكهات جريئة من علامة برافو، تعبئة أكياس عملية.",
        "en": "Bold-flavoured puffs from the Bravo brand, in practical bag packs."
      },
      "tag": {
        "ar": "بافس",
        "en": "Puffs"
      }
    },
    {
      "key": "crazy",
      "category": "snacks",
      "color": "#D62839",
      "init": {
        "ar": "C",
        "en": "C"
      },
      "logo": "images/crazy.webp",
      "name": {
        "ar": "كريزي",
        "en": "Crazy"
      },
      "desc": {
        "ar": "كريسبس وفرايدو ذرة مقرمشة بنكهات متعددة من علامة زجزاج.",
        "en": "Crispy corn crisps and Frido snacks in multiple flavours from Zegzag."
      },
      "tag": {
        "ar": "كريسبس وفرايدو",
        "en": "Crisps & Frido"
      }
    },
    {
      "key": "lightpop",
      "category": "candy",
      "color": "#2FA8E6",
      "init": {
        "ar": "L",
        "en": "L"
      },
      "logo": "images/lightpop.webp",
      "name": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "desc": {
        "ar": "مصاصات فواكه في أكياس وبرطمانات وشجرة وعربية عرض، وبون بون وتوفي.",
        "en": "Fruit lollipops in bags, jars, tree and car displays, plus bon bon and toffee."
      },
      "tag": {
        "ar": "مصاصات وحلوى",
        "en": "Lollipops & Candy"
      }
    },
    {
      "key": "honeygum",
      "category": "candy",
      "color": "#201C63",
      "init": {
        "ar": "H",
        "en": "H"
      },
      "logo": "images/brands/honey.webp",
      "name": {
        "ar": "هَني",
        "en": "Honey"
      },
      "desc": {
        "ar": "لبان محشو بنكهات الفاكهة والنعناع، تعبئة علبة وبرطمان.",
        "en": "Center-filled chewing gum in fruit and mint flavours, boxed or jarred."
      },
      "tag": {
        "ar": "لبان",
        "en": "Chewing Gum"
      }
    },
    {
      "key": "mojo",
      "category": "candy",
      "color": "#E5196B",
      "init": {
        "ar": "M",
        "en": "M"
      },
      "logo": "images/mojo.webp",
      "name": {
        "ar": "موجو",
        "en": "MOJO"
      },
      "desc": {
        "ar": "لولي بوب محشو ببابل جم بتصميم كرتوني موجه للأطفال.",
        "en": "Bubble-gum-filled lollipops with playful cartoon packaging for kids."
      },
      "tag": {
        "ar": "لولي بوب للأطفال",
        "en": "Kids' Lollipops"
      }
    },
    {
      "key": "tuttilolly",
      "category": "candy",
      "color": "#4A44A8",
      "init": {
        "ar": "T",
        "en": "T"
      },
      "logo": "images/tuttilolly.webp",
      "name": {
        "ar": "توتي لولي",
        "en": "Tutti Lolly"
      },
      "desc": {
        "ar": "لولي بوب حجم ميني بخلطة فواكه طبيعية الألوان.",
        "en": "Mini-size lollipops in a natural-colour fruit blend."
      },
      "tag": {
        "ar": "لولي بوب ميني",
        "en": "Mini Lollipops"
      }
    },
    {
      "key": "bravo",
      "category": "candy",
      "color": "#EE5A24",
      "init": {
        "ar": "B",
        "en": "B"
      },
      "logo": "images/brands/light.webp",
      "name": {
        "ar": "لايت شوجر فري",
        "en": "Light Sugar Free"
      },
      "desc": {
        "ar": "حلوى صلبة ولبان خاليين تماماً من السكر المضاف.",
        "en": "Sugar-free hard candy and chewing gum, 0% added sugar."
      },
      "tag": {
        "ar": "خالي من السكر",
        "en": "Sugar-Free"
      }
    },
    {
      "key": "bronto",
      "category": "pasta",
      "color": "#9B1B1E",
      "init": {
        "ar": "B",
        "en": "B"
      },
      "logo": "images/brands/bronto.webp",
      "name": {
        "ar": "برونتو",
        "en": "Bronto"
      },
      "desc": {
        "ar": "مكرونة برونتو، أصل المكرونة — مصنوعة من مكونات طبيعية 100% وبتستوي في 5 دقايق.",
        "en": "Bronto pasta — made from 100% natural ingredients and ready in 5 minutes."
      },
      "tag": {
        "ar": "مكرونة",
        "en": "Pasta"
      }
    },
    {
      "key": "hevory",
      "category": "sauces",
      "color": "#1E56C8",
      "init": {
        "ar": "H",
        "en": "H"
      },
      "logo": "images/brands/hevory.webp",
      "name": {
        "ar": "هيفوري",
        "en": "Hevory"
      },
      "desc": {
        "ar": "صوصات هيفوري — طعم متقن في كل عبوة: باربيكيو، مايونيز، رانش، ألف جزيرة ومسطردة.",
        "en": "Hevory sauces — perfectly crafted taste: BBQ, mayonnaise, ranch, thousand island and mustard."
      },
      "tag": {
        "ar": "صوصات",
        "en": "Sauces"
      }
    }
  ],
  "products": [
    {
      "name": {
        "ar": "أوت شيبس",
        "en": "Oat Chips"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "50-60 جم، عبوة (15 كيس)",
        "en": "50-60g, bag pack (15 bags)"
      },
      "details": {
        "ar": "شيبس شوفان مخبوز غير مقلي، بـ70% دهون أقل، مصنوع من حبوب كاملة وغني بالبروتين والألياف.",
        "en": "Baked, never-fried oat chips with 70% less fat, made with whole grains and high in protein and fibers."
      },
      "flavors": [
        {
          "img": "images/cheese.webp",
          "name": {
            "ar": "جبنة",
            "en": "Cheese"
          }
        },
        {
          "img": "images/sweet-lemon.webp",
          "name": {
            "ar": "ليمون حلو",
            "en": "Sweet Lemon"
          }
        },
        {
          "img": "images/sour-cream.webp",
          "name": {
            "ar": "قشدة حامضة",
            "en": "Sour Cream"
          }
        },
        {
          "img": "images/smokey-bbq.webp",
          "name": {
            "ar": "باربكيو مدخن",
            "en": "Smokey BBQ"
          }
        },
        {
          "img": "images/chicken.webp",
          "name": {
            "ar": "دجاج",
            "en": "Chicken"
          }
        },
        {
          "img": "images/flamin-hot.webp",
          "name": {
            "ar": "حار لاهب",
            "en": "Flamin' Hot"
          }
        },
        {
          "img": "images/grilled-ribs.webp",
          "name": {
            "ar": "ريش مشوية",
            "en": "Grilled Ribs"
          }
        },
        {
          "img": "images/sweet-chilli.webp",
          "name": {
            "ar": "شيلي حلو",
            "en": "Sweet Chilli"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "فاير فينجرز",
        "en": "Fire Fingers"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "50-60 جم، عبوة (15 كيس)",
        "en": "50-60g, bag pack (15 bags)"
      },
      "details": {
        "ar": "مقرمشات ذرة مخفوفة غير مقلية بنكهات حارة جريئة.",
        "en": "Puffed, never-fried corn crisps in bold spicy flavours."
      },
      "flavors": [
        {
          "img": "images/fire-fingers-spicy-shrimp.webp",
          "name": {
            "ar": "جمبري حار",
            "en": "Spicy Shrimp"
          }
        },
        {
          "img": "images/fire-fingers-spicy-salsa.webp",
          "name": {
            "ar": "طاطة حارة",
            "en": "Spicy Salsa"
          }
        },
        {
          "img": "images/fire-fingers-spicy-honey.webp",
          "name": {
            "ar": "عسل حار",
            "en": "Spicy Honey"
          }
        },
        {
          "img": "images/fire-fingers-spicy-lemon.webp",
          "name": {
            "ar": "ليمون حار",
            "en": "Spicy Lemon"
          }
        },
        {
          "img": "images/fire-fingers-spicy-cheese.webp",
          "name": {
            "ar": "جبنة حارة",
            "en": "Spicy Cheese"
          }
        },
        {
          "img": "images/fire-fingers-spicy-chicken.webp",
          "name": {
            "ar": "دجاج سامبينج حار",
            "en": "Spicy Chicken"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "كرانشي فينجرز",
        "en": "Crunchy Fingers"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "30 جم، عبوة (15 كيس)",
        "en": "30g, bag pack (15 bags)"
      },
      "details": {
        "ar": "أصابع ذرة مقرمشة غير مقلية، من حبوب كاملة وبدون مواد حافظة.",
        "en": "Never-fried crunchy corn fingers, made from whole grains with no preservatives."
      },
      "flavors": [
        {
          "img": "images/crunchy-corn-fingers-spice-lemon.webp",
          "name": {
            "ar": "ليمون حار",
            "en": "Spice Lemon"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-barbeque.webp",
          "name": {
            "ar": "باربكيو",
            "en": "Barbeque"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-sweet-pepper.webp",
          "name": {
            "ar": "فلفل حلو",
            "en": "Sweet Pepper"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-cheddar-cheese.webp",
          "name": {
            "ar": "جبنة تشيدر",
            "en": "Cheddar Cheese"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-chicken.webp",
          "name": {
            "ar": "دجاج",
            "en": "Chicken"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-shrimps.webp",
          "name": {
            "ar": "جمبري",
            "en": "Shrimps"
          }
        },
        {
          "img": "images/crunchy-corn-fingers-tomatoes.webp",
          "name": {
            "ar": "طماطم",
            "en": "Tomatoes"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "حلقات الشوفان",
        "en": "Oat Rings"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "50-60 جم، عبوة (15 كيس)",
        "en": "50-60g, bag pack (15 bags)"
      },
      "details": {
        "ar": "حلقات شوفان مخبوزة بالكامل، غنية بالألياف ومصنوعة من حبوب كاملة.",
        "en": "Fully baked oat rings, high in fibre and made from whole grains."
      },
      "flavors": [
        {
          "img": "images/oat-rings-seasoned-cheese.webp",
          "name": {
            "ar": "جبنة متبلة",
            "en": "Seasoned Cheese"
          }
        },
        {
          "img": "images/oat-rings-sour-cream.webp",
          "name": {
            "ar": "كريمة حامضة",
            "en": "Sour Cream"
          }
        },
        {
          "img": "images/oat-rings-grilled-chicken.webp",
          "name": {
            "ar": "دجاج مشوي",
            "en": "Grilled Chicken"
          }
        },
        {
          "img": "images/oat-rings-spicy-shrimp.webp",
          "name": {
            "ar": "جمبري حار",
            "en": "Spicy Shrimp"
          }
        },
        {
          "img": "images/oat-rings-tomato-basil.webp",
          "name": {
            "ar": "طماطم وريحان",
            "en": "Tomato & Basil"
          }
        },
        {
          "img": "images/oat-rings-sweet-chilli.webp",
          "name": {
            "ar": "شيلي حلو",
            "en": "Sweet Chilli"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "كريزي كريسبس بوب كورن",
        "en": "Crazy Crisps Popcorn"
      },
      "brand": {
        "ar": "كريزي",
        "en": "Crazy"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "details": {
        "ar": "كريسبس بوب كورن مقرمشة بنكهات جريئة.",
        "en": "Crunchy popcorn-shaped crisps in bold flavours."
      },
      "flavors": [
        {
          "img": "images/crazy-crisps-popcorn-lemon-twist.webp",
          "name": {
            "ar": "ليمون تويست",
            "en": "Lemon Twist"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-chili-shrimp.webp",
          "name": {
            "ar": "جمبري تشيلي",
            "en": "Chili Shrimp"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-bbq.webp",
          "name": {
            "ar": "باربكيو",
            "en": "BBQ"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-seasoned-cheese.webp",
          "name": {
            "ar": "جبنة متبلة",
            "en": "Seasoned Cheese"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-grilled-chicken.webp",
          "name": {
            "ar": "دجاج مشوي",
            "en": "Grilled Chicken"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-korean-chicken.webp",
          "name": {
            "ar": "دجاج كوري",
            "en": "Korean Chicken"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-korean-mixture.webp",
          "name": {
            "ar": "كوريان مكستشر",
            "en": "Korean Mixture"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-sweet-paprika.webp",
          "name": {
            "ar": "بابريكا حلوة",
            "en": "Sweet Paprika"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-rich-tomato.webp",
          "name": {
            "ar": "طماطم غنية",
            "en": "Rich Tomato"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-sour-cream.webp",
          "name": {
            "ar": "كريمة حامضة",
            "en": "Sour Cream"
          }
        },
        {
          "img": "images/crazy-crisps-popcorn-vinegar-salt.webp",
          "name": {
            "ar": "خل وملح",
            "en": "Vinegar & Salt"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "سوداني مغطى",
        "en": "Coated Peanuts"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "50 جم، عبوة (20 كيس)",
        "en": "50g, bag pack (20 bags)"
      },
      "details": {
        "ar": "فول سوداني مقرمش مغطى بطبقة متبلة، متوفر بعدة نكهات.",
        "en": "Crunchy coated peanuts with a seasoned crust, available in several flavours."
      },
      "flavors": [
        {
          "img": "images/coated-peanuts-bbq.webp",
          "name": {
            "ar": "باربكيو",
            "en": "BBQ"
          }
        },
        {
          "img": "images/coated-peanuts-salt-vinegar.webp",
          "name": {
            "ar": "ملح وخل",
            "en": "Salt & Vinegar"
          }
        },
        {
          "img": "images/coated-peanuts-cheese.webp",
          "name": {
            "ar": "جبنة",
            "en": "Cheese"
          }
        },
        {
          "img": "images/coated-peanuts-paprika.webp",
          "name": {
            "ar": "بابريكا",
            "en": "Paprika"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "فشار جورميه",
        "en": "Gourmet Popcorn"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "40-50 جم، عبوة (15 كيس)",
        "en": "40-50g, bag pack (15 bags)"
      },
      "details": {
        "ar": "فشار مقرمش بالهواء، خالٍ من الجلوتين وGMO، بنكهات جورميه متنوعة.",
        "en": "Air-popped, gluten-free, non-GMO popcorn in gourmet flavours."
      },
      "flavors": [
        {
          "img": "images/gourmet-popcorn-sweet-chili.webp",
          "name": {
            "ar": "فلفل حلو حار",
            "en": "Sweet Chili"
          }
        },
        {
          "img": "images/gourmet-popcorn-smoked-bbq.webp",
          "name": {
            "ar": "باربكيو مدخن",
            "en": "Smoked Hickory BBQ"
          }
        },
        {
          "img": "images/gourmet-popcorn-chicken.webp",
          "name": {
            "ar": "دجاج",
            "en": "Chicken"
          }
        },
        {
          "img": "images/gourmet-popcorn-korean-chicken.webp",
          "name": {
            "ar": "دجاج كوري",
            "en": "Korean Chicken"
          }
        },
        {
          "img": "images/gourmet-popcorn-sweet-lemon.webp",
          "name": {
            "ar": "ليمون حلو",
            "en": "Sweet Lemon"
          }
        },
        {
          "img": "images/gourmet-popcorn-sour-cream.webp",
          "name": {
            "ar": "كريمة حامضة",
            "en": "Sour Cream"
          }
        },
        {
          "img": "images/gourmet-popcorn-cheesy-bliss.webp",
          "name": {
            "ar": "جبنة",
            "en": "Cheesy Bliss"
          }
        },
        {
          "img": "images/gourmet-popcorn-spicy-korean-fusion.webp",
          "name": {
            "ar": "كوري حار",
            "en": "Spicy Korean Fusion"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "بافس",
        "en": "Puffs"
      },
      "brand": {
        "ar": "شيل آوت",
        "en": "ChillOut"
      },
      "color": "#2E2A74",
      "category": "snacks",
      "sizes": {
        "ar": "50-60 جم، عبوة (15 كيس)",
        "en": "50-60g, bag pack (15 bags)"
      },
      "details": {
        "ar": "بافس ذرة مخبوزة في الفرن غير مقلية، بطعم ذهبي حقيقي.",
        "en": "Oven-baked, never-fried corn puffs with the real golden taste."
      },
      "flavors": [
        {
          "img": "images/puffs-creamy-onion.webp",
          "name": {
            "ar": "كريمي أونيون",
            "en": "Creamy Onion"
          }
        },
        {
          "img": "images/puffs-melted-cheese.webp",
          "name": {
            "ar": "جبنة ذايبة",
            "en": "Melted Cheese"
          }
        },
        {
          "img": "images/puffs-korean-chicken.webp",
          "name": {
            "ar": "دجاج كوري",
            "en": "Korean Chicken"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "سبيشيال بافس",
        "en": "Special Puffs"
      },
      "brand": {
        "ar": "سبيشيال",
        "en": "Special"
      },
      "color": "#C0392B",
      "category": "snacks",
      "sizes": {
        "ar": "15 جم / 30 جم / 70 جم",
        "en": "15g / 30g / 70g"
      },
      "details": {
        "ar": "بافس ذرة مخبوزة غير مقلية، بنكهات جريئة.",
        "en": "Baked, never-fried corn puffs in bold flavours."
      },
      "flavors": [
        {
          "img": "images/special-puffs-sweet-pepper.webp",
          "name": {
            "ar": "فلفل حلو",
            "en": "Sweet Pepper"
          }
        },
        {
          "img": "images/special-puffs-chili-lemon.webp",
          "name": {
            "ar": "حار نار وليمون",
            "en": "Chili Fire Lemon"
          }
        },
        {
          "img": "images/special-puffs-shrimps.webp",
          "name": {
            "ar": "جمبري متبل",
            "en": "Seasoned Shrimps"
          }
        },
        {
          "img": "images/special-puffs-cheddar.webp",
          "name": {
            "ar": "جبنة شيدر",
            "en": "Cheddar Cheese"
          }
        },
        {
          "img": "images/special-puffs-chicken.webp",
          "name": {
            "ar": "دجاج",
            "en": "Tasty Chicken"
          }
        },
        {
          "img": "images/special-puffs-tomato-basil.webp",
          "name": {
            "ar": "ريحان وطماطم",
            "en": "Basil & Tomato"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "بوزو بافس",
        "en": "Bozo Puffs"
      },
      "hidden": true,
      "brand": {
        "ar": "بوزو",
        "en": "Bozo"
      },
      "color": "#14123B",
      "category": "snacks",
      "sizes": {
        "ar": "30-35 جم، عبوة (15 كيس)",
        "en": "30-35g, bag pack (15 bags)"
      },
      "details": {
        "ar": "مقرمشات ذرة كبيرة ومنفوخة، بافس بأحجام كبيرة وطعم غني.",
        "en": "Big, extra-puffed corn snacks with bold, rich flavours."
      },
      "flavors": [
        {
          "img": "images/bozo-puffs-peanut-butter.webp",
          "name": {
            "ar": "زبدة فول سوداني",
            "en": "Peanut Butter"
          }
        },
        {
          "img": "images/bozo-puffs-hot-seafood.webp",
          "name": {
            "ar": "سي فوود حار",
            "en": "Hot Seafood"
          }
        },
        {
          "img": "images/bozo-puffs-bbq.webp",
          "name": {
            "ar": "باربيكيو",
            "en": "BBQ"
          }
        },
        {
          "img": "images/bozo-puffs-mexican-salsa.webp",
          "name": {
            "ar": "صلصة مكسيكية",
            "en": "Mexican Salsa"
          }
        },
        {
          "img": "images/bozo-puffs-sour-cream-onion.webp",
          "name": {
            "ar": "كريمة حامضة وبصل",
            "en": "Sour Cream & Onion"
          }
        },
        {
          "img": "images/bozo-puffs-cheese.webp",
          "name": {
            "ar": "جبنة",
            "en": "Cheese"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "كريزي كريسبس",
        "en": "Crazy Crisps"
      },
      "brand": {
        "ar": "كريزي",
        "en": "Crazy"
      },
      "color": "#1A1A1A",
      "category": "snacks",
      "sizes": {
        "ar": "30-35 جم، عبوة (15 كيس)",
        "en": "30-35g, bag pack (15 bags)"
      },
      "details": {
        "ar": "كريسبس ذرة محمصة وليست مقلية، طبيعية 100%، بنكهات جريئة.",
        "en": "Roasted, not fried, 100% natural corn crisps in bold flavours."
      },
      "flavors": [
        {
          "img": "images/crazy-crisps-chicken.webp",
          "name": {
            "ar": "دجاج",
            "en": "Chicken"
          }
        },
        {
          "img": "images/crazy-crisps-shrimps.webp",
          "name": {
            "ar": "جمبري",
            "en": "Shrimps"
          }
        },
        {
          "img": "images/crazy-crisps-tomatoes.webp",
          "name": {
            "ar": "طماطم",
            "en": "Tomatoes"
          }
        },
        {
          "img": "images/crazy-crisps-flaming-hot.webp",
          "name": {
            "ar": "حار ناري",
            "en": "Flaming Hot"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "كريزي كريسبس كرينكل",
        "en": "Crazy Crisps Crinkle"
      },
      "brand": {
        "ar": "كريزي",
        "en": "Crazy"
      },
      "color": "#D62839",
      "category": "snacks",
      "sizes": {
        "ar": "15 جم، عبوة (100 كيس)",
        "en": "15g, bag pack (100 bags)"
      },
      "details": {
        "ar": "كريسبس كرينكل بنكهات جريئة ومتنوعة من زجزاج.",
        "en": "Crinkle-cut crisps in bold, varied flavours from Zegzag."
      },
      "flavors": [
        {
          "img": "images/crazy-frido-korean-mixture.webp",
          "name": {
            "ar": "كوريان مكستشر",
            "en": "Korean Mixture"
          }
        },
        {
          "img": "images/crazy-frido-sweet-paprika.webp",
          "name": {
            "ar": "بابريكا حلوة",
            "en": "Sweet Paprika"
          }
        },
        {
          "img": "images/crazy-frido-chili-lemon.webp",
          "name": {
            "ar": "تشيلي وليمون",
            "en": "Chili & Lemon"
          }
        },
        {
          "img": "images/crazy-frido-rich-tomato.webp",
          "name": {
            "ar": "طماطم غنية",
            "en": "Rich Tomato"
          }
        }
      ]
    },
    {
      "name": {
        "ar": "مصاصة فواكه",
        "en": "Fruits Lollipop"
      },
      "brand": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "color": "#FDB815",
      "category": "candy",
      "sizes": {
        "ar": "7-20 جم للقطعة · أكياس 50 و100 قطعة · برطمانات 120 و150 قطعة · شجرة 72 و120 قطعة · عربية 80 قطعة",
        "en": "7-20g per piece · bags of 50 & 100 · jars of 120 & 150 · trees of 72 & 120 · car display of 80"
      },
      "flavors": [
        {
          "img": "images/lp-lollipop-mix-bag-hd.webp",
          "name": {
            "ar": "كيس ميكس فليفرز",
            "en": "Mix Flavors Bag"
          }
        },
        {
          "img": "images/lp-lollipop-bag.webp",
          "name": {
            "ar": "كيس لولي بوب",
            "en": "Lollipop Bag"
          }
        },
        {
          "img": "images/lp-fruits-bag-red.webp",
          "name": {
            "ar": "كيس فروتس – أحمر",
            "en": "Fruits Bag – Red"
          }
        },
        {
          "img": "images/lp-fruits-bag-yellow.webp",
          "name": {
            "ar": "كيس فروتس – أصفر",
            "en": "Fruits Bag – Yellow"
          }
        },
        {
          "img": "images/lp-lollipop-jar-stand.webp",
          "name": {
            "ar": "برطمان بستاند",
            "en": "Jar with Stand"
          }
        },
        {
          "img": "images/lp-lollipop-jar-1.webp",
          "name": {
            "ar": "برطمان",
            "en": "Jar"
          }
        },
        {
          "img": "images/lp-lollipop-jar-3.webp",
          "name": {
            "ar": "برطمان بستاند صغير",
            "en": "Small Jar with Stand"
          }
        },
        {
          "img": "images/lp-lollipop-tree-1.webp",
          "name": {
            "ar": "شجرة 72 قطعة",
            "en": "Tree – 72 pcs"
          }
        },
        {
          "img": "images/lp-lollipop-tree-2.webp",
          "name": {
            "ar": "شجرة 120 قطعة",
            "en": "Tree – 120 pcs"
          }
        },
        {
          "img": "images/lp-lollipop-car.webp",
          "name": {
            "ar": "عربية 80 قطعة",
            "en": "Car Display – 80 pcs"
          }
        },
        {
          "img": "images/lp-lollipop-boxes.webp",
          "name": {
            "ar": "علب",
            "en": "Boxes"
          }
        }
      ],
      "image": "images/lp-lollipop-mix-bag-hd.webp"
    },
    {
      "name": {
        "ar": "لولي بوب محشو بابل جم",
        "en": "Bubble Gum Filled Lollipop"
      },
      "brand": {
        "ar": "موجو",
        "en": "MOJO"
      },
      "color": "#E5196B",
      "category": "candy",
      "sizes": {
        "ar": "14-15 جم للقطعة · كيس 50 قطعة · علب 30 و100 قطعة · برطمانات 120 و150 قطعة · شجرة 72 و120 قطعة",
        "en": "14-15g per piece · bag of 50 · boxes of 30 & 100 · jars of 120 & 150 · trees of 72 & 120"
      },
      "flavors": [
        {
          "img": "images/mojo-strawberry-box.webp",
          "name": {
            "ar": "فراولة – علبة عرض",
            "en": "Strawberry – Display Box"
          }
        },
        {
          "img": "images/mojo-mango-box.webp",
          "name": {
            "ar": "مانجو – علبة عرض",
            "en": "Mango – Display Box"
          }
        },
        {
          "img": "images/mojo-green-apple-box.webp",
          "name": {
            "ar": "تفاح أخضر – علبة عرض",
            "en": "Green Apple – Display Box"
          }
        },
        {
          "img": "images/mojo-cola-box.webp",
          "name": {
            "ar": "كولا – علبة عرض",
            "en": "Cola – Display Box"
          }
        },
        {
          "img": "images/mojo-assorted-box.webp",
          "name": {
            "ar": "مشكّل – علبة عرض",
            "en": "Assorted – Display Box"
          }
        },
        {
          "img": "images/mojo-red-box.webp",
          "name": {
            "ar": "علبة كرتون",
            "en": "Carton Box"
          }
        },
        {
          "img": "images/mojo-jar-stand.webp",
          "name": {
            "ar": "برطمان بستاند",
            "en": "Jar with Stand"
          }
        },
        {
          "img": "images/mojo-tower-display.webp",
          "name": {
            "ar": "ستاند برج",
            "en": "Tower Display"
          }
        },
        {
          "img": "images/mojo-bags.webp",
          "name": {
            "ar": "أكياس",
            "en": "Bags"
          }
        }
      ],
      "image": "images/mojo-strawberry-box.webp"
    },
    {
      "name": {
        "ar": "مصاصات توتي لولي",
        "en": "Tutti Lolly Lollipops"
      },
      "brand": {
        "ar": "توتي لولي",
        "en": "Tutti Lolly"
      },
      "color": "#4A44A8",
      "category": "candy",
      "sizes": {
        "ar": "كيس 50 قطعة (7-8 جم) · برطمان 30 قطعة (7-8 جم) · شجرة 72 قطعة (14-15 جم)",
        "en": "Bag of 50 (7-8g) · jar of 30 (7-8g) · tree of 72 (14-15g)"
      },
      "flavors": [
        {
          "img": "images/tutti-mix-bag-v2.webp",
          "name": {
            "ar": "كيس ميكس فليفرز",
            "en": "Mix Flavors Bag"
          }
        },
        {
          "img": "images/tutti-strawberry.webp",
          "name": {
            "ar": "فراولة",
            "en": "Strawberry"
          }
        },
        {
          "img": "images/tutti-tropical.webp",
          "name": {
            "ar": "فواكه استوائية",
            "en": "Tropical Fruits"
          }
        },
        {
          "img": "images/tutti-orange.webp",
          "name": {
            "ar": "برتقال",
            "en": "Orange"
          }
        },
        {
          "img": "images/tutti-green-apple.webp",
          "name": {
            "ar": "تفاح أخضر",
            "en": "Green Apple"
          }
        },
        {
          "img": "images/tutti-blueberry.webp",
          "name": {
            "ar": "توت",
            "en": "Blueberry"
          }
        },
        {
          "img": "images/tutti-cola.webp",
          "name": {
            "ar": "كولا",
            "en": "Cola"
          }
        },
        {
          "img": "images/tutti-jar-stand.webp",
          "name": {
            "ar": "برطمان بستاند",
            "en": "Jar with Stand"
          }
        },
        {
          "img": "images/tutti-tower.webp",
          "name": {
            "ar": "ستاند برج",
            "en": "Tower Display"
          }
        },
        {
          "img": "images/tutti-jar.webp",
          "name": {
            "ar": "برطمان",
            "en": "Jar"
          }
        }
      ],
      "image": "images/tutti-jar-stand.webp"
    },
    {
      "name": {
        "ar": "توتي لولي ميكس فليفرز",
        "en": "Tutti Lolly Mix Flavors"
      },
      "brand": {
        "ar": "توتي لولي",
        "en": "Tutti Lolly"
      },
      "color": "#4A44A8",
      "category": "candy",
      "soon": true
    },
    {
      "name": {
        "ar": "بون بون",
        "en": "Bon Bon"
      },
      "brand": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "color": "#FDB815",
      "category": "candy",
      "sizes": {
        "ar": "3-4 جم للقطعة · كيس 50 قطعة · علبة 100 قطعة · برطمان 250 قطعة",
        "en": "3-4g per piece · bag of 50 · box of 100 · jar of 250"
      },
      "flavors": [
        {
          "img": "images/lightpop-fruits-bonbon.webp",
          "name": {
            "ar": "فواكه – كيس",
            "en": "Fruits – Bag"
          }
        },
        {
          "img": "images/lp-bonbon-milky-fruity.webp",
          "name": {
            "ar": "ميلكي فروتي – كيس",
            "en": "Milky Fruity – Bag"
          }
        },
        {
          "img": "images/lp-bonbon-coffee.webp",
          "name": {
            "ar": "قهوة – كيس",
            "en": "Coffee – Bag"
          }
        },
        {
          "img": "images/lp-bonbon-strawberry-box.webp",
          "name": {
            "ar": "فراولة – علبة",
            "en": "Strawberry – Box"
          }
        },
        {
          "img": "images/lp-bonbon-boxes.webp",
          "name": {
            "ar": "علب بالنكهات",
            "en": "Flavor Boxes"
          }
        },
        {
          "img": "images/lp-bonbon-cola-jar.webp",
          "name": {
            "ar": "كولا – برطمان",
            "en": "Cola – Jar"
          }
        },
        {
          "img": "images/lp-bonbon-jars.webp",
          "name": {
            "ar": "برطمانات بالنكهات",
            "en": "Flavor Jars"
          }
        }
      ],
      "image": "images/lightpop-fruits-bonbon.webp"
    },
    {
      "name": {
        "ar": "لبان هَني",
        "en": "Honey Gum"
      },
      "brand": {
        "ar": "هَني",
        "en": "Honey"
      },
      "color": "#201C63",
      "category": "candy",
      "sizes": {
        "ar": "3-4 جم للقطعة · علبة 50 و100 قطعة · برطمان 250 قطعة",
        "en": "3-4g per piece · boxes of 50 & 100 · jar of 250"
      },
      "flavors": [
        {
          "img": "images/honey-piece-strawberry.webp",
          "name": {
            "ar": "فراولة – قطعة",
            "en": "Strawberry – Piece"
          }
        },
        {
          "img": "images/honey-piece-mango.webp",
          "name": {
            "ar": "مانجو – قطعة",
            "en": "Mango – Piece"
          }
        },
        {
          "img": "images/honey-piece-banana.webp",
          "name": {
            "ar": "موز – قطعة",
            "en": "Banana – Piece"
          }
        },
        {
          "img": "images/honey-piece-green-apple.webp",
          "name": {
            "ar": "تفاح أخضر – قطعة",
            "en": "Green Apple – Piece"
          }
        },
        {
          "img": "images/honey-piece-mint.webp",
          "name": {
            "ar": "نعناع – قطعة",
            "en": "Mint – Piece"
          }
        },
        {
          "img": "images/honey-piece-cola.webp",
          "name": {
            "ar": "كولا – قطعة",
            "en": "Cola – Piece"
          }
        },
        {
          "img": "images/honey-gum-mint.webp",
          "name": {
            "ar": "نعناع",
            "en": "Mint"
          }
        },
        {
          "img": "images/honey-gum-green-apple.webp",
          "name": {
            "ar": "تفاح أخضر",
            "en": "Green Apple"
          }
        },
        {
          "img": "images/honey-gum-strawberry.webp",
          "name": {
            "ar": "فراولة",
            "en": "Strawberry"
          }
        },
        {
          "img": "images/honey-gum-cola.webp",
          "name": {
            "ar": "كولا",
            "en": "Cola"
          }
        },
        {
          "img": "images/honey-gum-mango.webp",
          "name": {
            "ar": "مانجو",
            "en": "Mango"
          }
        },
        {
          "img": "images/honey-gum-banana.webp",
          "name": {
            "ar": "موز",
            "en": "Banana"
          }
        },
        {
          "img": "images/honey-gum-mix.webp",
          "name": {
            "ar": "نكهات مشكلة",
            "en": "Mix Flavors"
          }
        },
        {
          "img": "images/honey-box.webp",
          "name": {
            "ar": "علبة",
            "en": "Box"
          }
        },
        {
          "img": "images/honey-box-top.webp",
          "name": {
            "ar": "علبة – من فوق",
            "en": "Box – Top View"
          }
        }
      ],
      "image": "images/honey-gum-strawberry.webp"
    },
    {
      "name": {
        "ar": "لايت شوجر فري – بدون سكر",
        "en": "Light Sugar Free"
      },
      "brand": {
        "ar": "لايت شوجر فري",
        "en": "Light Sugar Free"
      },
      "color": "#E8432F",
      "category": "candy",
      "sizes": {
        "ar": "30-35 جم · كيس أو علبة هرم · الكرتونة 24 قطعة",
        "en": "30-35g · pouch or pyramid box · 24 per carton"
      },
      "flavors": [
        {
          "img": "images/light-sf-lollipops-bag.webp",
          "name": {
            "ar": "مصاصات فواكه – كيس",
            "en": "Mixed Fruit Lollipops – Pouch"
          }
        },
        {
          "img": "images/light-sf-bonbon-bag.webp",
          "name": {
            "ar": "بون بون فواكه – كيس",
            "en": "Mixed Fruit Bonbon – Pouch"
          }
        },
        {
          "img": "images/light-sf-honey-gum-bag.webp",
          "name": {
            "ar": "هَني لايت لبان – كيس",
            "en": "Honey Light Gum – Pouch"
          }
        },
        {
          "img": "images/light-sf-lollipops-pyramid.webp",
          "name": {
            "ar": "مصاصات فواكه – هرم",
            "en": "Mixed Fruit Lollipops – Pyramid"
          }
        },
        {
          "img": "images/light-sf-bonbon-pyramid.webp",
          "name": {
            "ar": "بون بون فواكه – هرم",
            "en": "Mixed Fruit Bonbon – Pyramid"
          }
        },
        {
          "img": "images/light-sf-honey-gum-pyramid.webp",
          "name": {
            "ar": "هَني لايت لبان – هرم",
            "en": "Honey Light Gum – Pyramid"
          }
        }
      ],
      "image": "images/light-sf-lollipops-bag.webp"
    },
    {
      "name": {
        "ar": "توفي",
        "en": "Toffee"
      },
      "brand": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "color": "#FDB815",
      "category": "candy",
      "sizes": {
        "ar": "كيس 90-100 جم · الكرتونة 24 كيس",
        "en": "90-100g bag · 24 bags per carton"
      },
      "flavors": [
        {
          "img": "images/toffee-milk.webp",
          "name": {
            "ar": "حليب",
            "en": "Milk"
          }
        },
        {
          "img": "images/toffee-chocolate.webp",
          "name": {
            "ar": "شوكولاتة",
            "en": "Chocolate"
          }
        }
      ],
      "image": "images/toffee-milk.webp"
    },
    {
      "name": {
        "ar": "لولي بوب مِكس فليفرز",
        "en": "Lollipop Mix Flavors"
      },
      "hidden": true,
      "brand": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "color": "#FDB815",
      "category": "candy",
      "sizes": {
        "ar": "14-20 جم للقطعة، أكياس 50-100 قطعة",
        "en": "14-20g per piece, bags of 50-100 pieces"
      }
    },
    {
      "name": {
        "ar": "إكلير لايت",
        "en": "Eclair"
      },
      "brand": {
        "ar": "لايت بوب",
        "en": "Light Pop"
      },
      "color": "#FDB815",
      "category": "candy",
      "sizes": {
        "ar": "70-80 جم كيس / 400 جم علبة / 200 قطعة برطمان",
        "en": "70-80g bag / 400g box / 200-piece jar"
      },
      "flavors": [
        {
          "img": "images/eclair-light.webp",
          "name": {
            "ar": "كراميل بشوكولاتة",
            "en": "Chocolate Caramel"
          }
        }
      ],
      "hidden": true
    },
    {
      "name": {
        "ar": "مكرونة برونتو",
        "en": "Bronto Pasta"
      },
      "brand": {
        "ar": "برونتو",
        "en": "Bronto"
      },
      "color": "#C8202A",
      "category": "pasta",
      "details": {
        "ar": "مكرونة من مكونات طبيعية 100%، بتستوي في 5 دقايق.",
        "en": "Made from 100% natural ingredients, cooks in 5 minutes."
      },
      "flavors": [
        { "img": "images/bronto-spaghetti.webp", "name": { "ar": "اسباجيتي", "en": "Spaghetti" } },
        { "img": "images/bronto-penne.webp", "name": { "ar": "أقلام", "en": "Penne" } },
        { "img": "images/bronto-elbow.webp", "name": { "ar": "هلالية", "en": "Elbow Macaroni" } },
        { "img": "images/bronto-ditalini.webp", "name": { "ar": "قصيرة", "en": "Ditalini" } }
      ]
    },
    {
      "name": {
        "ar": "صوصات هيفوري",
        "en": "Hevory Sauces"
      },
      "brand": {
        "ar": "هيفوري",
        "en": "Hevory"
      },
      "color": "#1E56C8",
      "category": "sauces",
      "sizes": {
        "ar": "عبوة 250 مل",
        "en": "250 ml squeeze bottle"
      },
      "flavors": [
        { "img": "images/hevory-bbq.webp", "name": { "ar": "صوص الباربيكيو", "en": "BBQ Sauce" } },
        { "img": "images/hevory-mayonnaise.webp", "name": { "ar": "كلاسيك مايونيز", "en": "Classic Mayonnaise" } },
        { "img": "images/hevory-ranch.webp", "name": { "ar": "رانش دريسنج", "en": "Ranch Dressing" } },
        { "img": "images/hevory-1000-island.webp", "name": { "ar": "صوص ألف جزيرة", "en": "1000 Island" } },
        { "img": "images/hevory-mustard.webp", "name": { "ar": "مسطردة أمريكي", "en": "American Mustard" } }
      ]
    }
  ],
  "certifications": [
    {
      "name": {
        "ar": "شهادة حلال",
        "en": "HALAL Certified"
      },
      "code": "HALAL"
    },
    {
      "name": {
        "ar": "ISO 22000",
        "en": "ISO 22000"
      },
      "code": "FOOD SAFETY"
    },
    {
      "name": {
        "ar": "ISO 45001",
        "en": "ISO 45001"
      },
      "code": "OH&S"
    },
    {
      "name": {
        "ar": "ISO 9001",
        "en": "ISO 9001"
      },
      "code": "QUALITY MGMT"
    },
    {
      "name": {
        "ar": "HACCP",
        "en": "HACCP"
      },
      "code": "HAZARD CONTROL"
    },
    {
      "name": {
        "ar": "اعتماد FDA",
        "en": "FDA Registered"
      },
      "code": "US MARKET"
    }
  ],
  "reach": [
    {
      "name": {
        "ar": "أوروبا (9)",
        "en": "Europe (9)"
      },
      "value": {
        "ar": "هولندا، إنجلترا، فرنسا، ألمانيا، رومانيا، السويد، النرويج، بلجيكا، إيطاليا",
        "en": "Netherlands, England, France, Germany, Romania, Sweden, Norway, Belgium, Italy"
      }
    },
    {
      "name": {
        "ar": "أفريقيا (15)",
        "en": "Africa (15)"
      },
      "value": {
        "ar": "ليبيا، المغرب، السودان، جيبوتي، كينيا، أوغندا، تشاد، النيجر، السنغال، غانا، ساو تومي وبرينسيب، زيمبابوي، جنوب أفريقيا، مدغشقر، موريشيوس",
        "en": "Libya, Morocco, Sudan, Djibouti, Kenya, Uganda, Chad, Niger, Senegal, Ghana, São Tomé & Príncipe, Zimbabwe, South Africa, Madagascar, Mauritius"
      }
    },
    {
      "name": {
        "ar": "الشرق الأوسط وآسيا (14)",
        "en": "Middle East & Asia (14)"
      },
      "value": {
        "ar": "الإمارات، قطر، تركيا، لبنان، البحرين، العراق، عمان، الأردن، فلسطين، اليمن، السعودية، الكويت، الهند، سوريا",
        "en": "UAE, Qatar, Turkey, Lebanon, Bahrain, Iraq, Oman, Jordan, Palestine, Yemen, Saudi Arabia, Kuwait, India, Syria"
      }
    },
    {
      "name": {
        "ar": "الأمريكتين (4)",
        "en": "Americas (4)"
      },
      "value": {
        "ar": "الولايات المتحدة، كندا، كوبا، الكاريبي",
        "en": "United States, Canada, Cuba, Caribbean"
      }
    }
  ],
  "leadership": [
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "رئيس مجلس الإدارة التنفيذي",
        "en": "Executive Chairman"
      },
      "init": "A"
    },
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "المدير العام",
        "en": "General Manager"
      },
      "init": "B"
    },
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "نائب رئيس مجلس الإدارة",
        "en": "Vice Chairman"
      },
      "init": "C"
    },
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "عضو مجلس إدارة منتدب",
        "en": "Managing Board Member"
      },
      "init": "D"
    },
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "عضو مجلس إدارة مستقل",
        "en": "Independent Board Member"
      },
      "init": "E"
    },
    {
      "name": {
        "ar": "[الاسم]",
        "en": "[Name]"
      },
      "title": {
        "ar": "عضو مجلس إدارة مستقل",
        "en": "Independent Board Member"
      },
      "init": "F"
    }
  ],
  "markets": [
    {
      "name": {
        "ar": "الولايات المتحدة",
        "en": "United States"
      }
    },
    {
      "name": {
        "ar": "السويد",
        "en": "Sweden"
      }
    },
    {
      "name": {
        "ar": "ألمانيا",
        "en": "Germany"
      }
    },
    {
      "name": {
        "ar": "فرنسا",
        "en": "France"
      }
    },
    {
      "name": {
        "ar": "هولندا",
        "en": "Netherlands"
      }
    },
    {
      "name": {
        "ar": "كوبا",
        "en": "Cuba"
      }
    },
    {
      "name": {
        "ar": "بلجيكا",
        "en": "Belgium"
      }
    },
    {
      "name": {
        "ar": "رومانيا",
        "en": "Romania"
      }
    },
    {
      "name": {
        "ar": "إيطاليا",
        "en": "Italy"
      }
    },
    {
      "name": {
        "ar": "الإمارات",
        "en": "UAE"
      }
    },
    {
      "name": {
        "ar": "قطر",
        "en": "Qatar"
      }
    },
    {
      "name": {
        "ar": "تركيا",
        "en": "Turkey"
      }
    },
    {
      "name": {
        "ar": "ليبيا",
        "en": "Libya"
      }
    },
    {
      "name": {
        "ar": "المغرب",
        "en": "Morocco"
      }
    },
    {
      "name": {
        "ar": "مدغشقر",
        "en": "Madagascar"
      }
    },
    {
      "name": {
        "ar": "لبنان",
        "en": "Lebanon"
      }
    },
    {
      "name": {
        "ar": "البحرين",
        "en": "Bahrain"
      }
    },
    {
      "name": {
        "ar": "العراق",
        "en": "Iraq"
      }
    },
    {
      "name": {
        "ar": "عمان",
        "en": "Oman"
      }
    },
    {
      "name": {
        "ar": "الأردن",
        "en": "Jordan"
      }
    },
    {
      "name": {
        "ar": "فلسطين",
        "en": "Palestine"
      }
    },
    {
      "name": {
        "ar": "اليمن",
        "en": "Yemen"
      }
    },
    {
      "name": {
        "ar": "جنوب أفريقيا",
        "en": "South Africa"
      }
    },
    {
      "name": {
        "ar": "السودان",
        "en": "Sudan"
      }
    },
    {
      "name": {
        "ar": "السعودية",
        "en": "Saudi Arabia"
      }
    },
    {
      "name": {
        "ar": "الكويت",
        "en": "Kuwait"
      }
    },
    {
      "name": {
        "ar": "الهند",
        "en": "India"
      }
    },
    {
      "name": {
        "ar": "سوريا",
        "en": "Syria"
      }
    },
    {
      "name": {
        "ar": "كينيا",
        "en": "Kenya"
      }
    },
    {
      "name": {
        "ar": "النرويج",
        "en": "Norway"
      }
    },
    {
      "name": {
        "ar": "جيبوتي",
        "en": "Djibouti"
      }
    },
    {
      "name": {
        "ar": "كندا",
        "en": "Canada"
      }
    },
    {
      "name": {
        "ar": "إنجلترا",
        "en": "England"
      }
    },
    {
      "name": {
        "ar": "أوغندا",
        "en": "Uganda"
      }
    },
    {
      "name": {
        "ar": "تشاد",
        "en": "Chad"
      }
    },
    {
      "name": {
        "ar": "النيجر",
        "en": "Niger"
      }
    },
    {
      "name": {
        "ar": "السنغال",
        "en": "Senegal"
      }
    },
    {
      "name": {
        "ar": "غانا",
        "en": "Ghana"
      }
    },
    {
      "name": {
        "ar": "زيمبابوي",
        "en": "Zimbabwe"
      }
    },
    {
      "name": {
        "ar": "ساو تومي وبرينسيب",
        "en": "São Tomé and Príncipe"
      }
    },
    {
      "name": {
        "ar": "موريشيوس",
        "en": "Mauritius"
      }
    },
    {
      "name": {
        "ar": "الكاريبي",
        "en": "Caribbean"
      }
    }
  ],
  "offers": []
};
