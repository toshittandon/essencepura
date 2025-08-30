// Quiz questions and product mapping logic for Essence Pura Personalized Routine Quiz

// Separate Skincare & Body Quiz Questions
export const skincareQuizQuestions = {
    en: [
        {
            id: 1,
            section: "skincare",
            question: "How does your skin typically feel by the end of the day?",
            answers: [
                { id: "a", text: "Shiny and greasy", mapping: "Oily" },
                { id: "b", text: "Tight, flaky, or rough", mapping: "Dry" },
                { id: "c", text: "Oily in the T-zone but dry elsewhere", mapping: "Combination" },
                { id: "d", text: "Comfortable and balanced", mapping: "Normal" },
                { id: "e", text: "Easily irritated, red, or itchy", mapping: "Sensitive" }
            ]
        },
        {
            id: 2,
            section: "skincare",
            question: "What is your primary skin concern?",
            answers: [
                { id: "a", text: "Dullness and uneven skin tone", mapping: "Brightening" },
                { id: "b", text: "Fine lines, wrinkles, and loss of firmness", mapping: "Anti-Wrinkle" },
                { id: "c", text: "Dehydration and a weak skin barrier", mapping: "Barrier Repair/Hydration" },
                { id: "d", text: "Clogged pores and occasional breakouts", mapping: "Detox/Exfoliating" },
                { id: "e", text: "Puffiness and dark circles around the eyes", mapping: "Eye Concerns" }
            ]
        },
        {
            id: 3,
            section: "skincare",
            question: "What is your secondary skin concern? (Optional)",
            optional: true,
            answers: [
                { id: "a", text: "Dullness and uneven skin tone", mapping: "Brightening" },
                { id: "b", text: "Fine lines, wrinkles, and loss of firmness", mapping: "Anti-Wrinkle" },
                { id: "c", text: "Dehydration and a weak skin barrier", mapping: "Barrier Repair/Hydration" },
                { id: "d", text: "Clogged pores and occasional breakouts", mapping: "Detox/Exfoliating" },
                { id: "e", text: "Puffiness and dark circles around the eyes", mapping: "Eye Concerns" },
                { id: "f", text: "Skip this question", mapping: "None" }
            ]
        },
        {
            id: 4,
            section: "skincare",
            question: "How do you like your sunscreen to feel?",
            answers: [
                { id: "a", text: "A physical barrier, great for sensitive skin", mapping: "Mineral SPF 30" },
                { id: "b", text: "Lightweight with high protection", mapping: "Hybrid SPF 50+" }
            ]
        },
        {
            id: 5,
            section: "bodycare",
            question: "What's your body skin like?",
            answers: [
                { id: "a", text: "Prone to sensitivity and dryness", mapping: "Gentle/Sensitive" },
                { id: "b", text: "A bit bumpy, dull, or prone to body acne", mapping: "Exfoliating" },
                { id: "c", text: "Very dry, with rough patches", mapping: "Urea Repair" },
                { id: "d", text: "Normal, but could use a hydration boost", mapping: "Hydration" }
            ]
        }
    ],
    de: [
        {
            id: 1,
            section: "skincare",
            question: "Wie fühlt sich Ihre Haut normalerweise am Ende des Tages an?",
            answers: [
                { id: "a", text: "Glänzend und fettig", mapping: "Oily" },
                { id: "b", text: "Straff, schuppig oder rau", mapping: "Dry" },
                { id: "c", text: "Fettig in der T-Zone, aber anderswo trocken", mapping: "Combination" },
                { id: "d", text: "Angenehm und ausgeglichen", mapping: "Normal" },
                { id: "e", text: "Leicht gereizt, rot oder juckend", mapping: "Sensitive" }
            ]
        },
        {
            id: 2,
            section: "skincare",
            question: "Was ist Ihr Haupthautproblem?",
            answers: [
                { id: "a", text: "Mattheit und ungleichmäßiger Hautton", mapping: "Brightening" },
                { id: "b", text: "Feine Linien, Falten und Verlust der Festigkeit", mapping: "Anti-Wrinkle" },
                { id: "c", text: "Dehydrierung und schwache Hautbarriere", mapping: "Barrier Repair/Hydration" },
                { id: "d", text: "Verstopfte Poren und gelegentliche Ausbrüche", mapping: "Detox/Exfoliating" },
                { id: "e", text: "Schwellungen und Augenringe", mapping: "Eye Concerns" }
            ]
        },
        {
            id: 3,
            section: "skincare",
            question: "Was ist Ihr zweites Hautproblem? (Optional)",
            optional: true,
            answers: [
                { id: "a", text: "Mattheit und ungleichmäßiger Hautton", mapping: "Brightening" },
                { id: "b", text: "Feine Linien, Falten und Verlust der Festigkeit", mapping: "Anti-Wrinkle" },
                { id: "c", text: "Dehydrierung und schwache Hautbarriere", mapping: "Barrier Repair/Hydration" },
                { id: "d", text: "Verstopfte Poren und gelegentliche Ausbrüche", mapping: "Detox/Exfoliating" },
                { id: "e", text: "Schwellungen und Augenringe", mapping: "Eye Concerns" },
                { id: "f", text: "Diese Frage überspringen", mapping: "None" }
            ]
        },
        {
            id: 4,
            section: "skincare",
            question: "Wie soll sich Ihr Sonnenschutz anfühlen?",
            answers: [
                { id: "a", text: "Eine physische Barriere, ideal für empfindliche Haut", mapping: "Mineral SPF 30" },
                { id: "b", text: "Leicht mit hohem Schutz", mapping: "Hybrid SPF 50+" }
            ]
        },
        {
            id: 5,
            section: "bodycare",
            question: "Wie ist Ihre Körperhaut?",
            answers: [
                { id: "a", text: "Neigt zu Empfindlichkeit und Trockenheit", mapping: "Gentle/Sensitive" },
                { id: "b", text: "Etwas holprig, matt oder neigt zu Körperakne", mapping: "Exfoliating" },
                { id: "c", text: "Sehr trocken, mit rauen Stellen", mapping: "Urea Repair" },
                { id: "d", text: "Normal, könnte aber einen Feuchtigkeitsschub gebrauchen", mapping: "Hydration" }
            ]
        }
    ]
};

// Separate Haircare Quiz Questions
export const haircareQuizQuestions = {
    en: [
        {
            id: 1,
            section: "haircare",
            question: "What is your main scalp concern?",
            answers: [
                { id: "a", text: "Hair fall or thinning", mapping: "Anti-Hair Fall" },
                { id: "b", text: "Dryness and some flaking", mapping: "Moisture" },
                { id: "c", text: "Oily and gets greasy quickly", mapping: "Clarifying/Balancing" },
                { id: "d", text: "No major issues, it feels balanced", mapping: "Moisture" }
            ]
        },
        {
            id: 2,
            section: "haircare",
            question: "What is your primary hair concern?",
            answers: [
                { id: "a", text: "Damage, split ends, and breakage", mapping: "Repair" },
                { id: "b", text: "Dryness, frizz, and lack of moisture", mapping: "Moisture/Frizz" },
                { id: "c", text: "Lack of shine and luster", mapping: "Shine" },
                { id: "d", text: "It feels weak and lacks volume", mapping: "Strength" }
            ]
        }
    ],
    de: [
        {
            id: 1,
            section: "haircare",
            question: "Was ist Ihr Hauptkopfhautproblem?",
            answers: [
                { id: "a", text: "Haarausfall oder dünner werdendes Haar", mapping: "Anti-Hair Fall" },
                { id: "b", text: "Trockenheit und etwas Schuppenbildung", mapping: "Moisture" },
                { id: "c", text: "Fettig und wird schnell fettig", mapping: "Clarifying/Balancing" },
                { id: "d", text: "Keine größeren Probleme, fühlt sich ausgeglichen an", mapping: "Moisture" }
            ]
        },
        {
            id: 2,
            section: "haircare",
            question: "Was ist Ihr Haupthaarproblem?",
            answers: [
                { id: "a", text: "Schäden, Spliss und Bruch", mapping: "Repair" },
                { id: "b", text: "Trockenheit, Frizz und Feuchtigkeitsmangel", mapping: "Moisture/Frizz" },
                { id: "c", text: "Mangel an Glanz und Leuchtkraft", mapping: "Shine" },
                { id: "d", text: "Fühlt sich schwach an und fehlt Volumen", mapping: "Strength" }
            ]
        }
    ]
};

// Legacy combined questions for backward compatibility
export const quizQuestions = skincareQuizQuestions;

// Product recommendation mapping logic
export const productMapping = {
    // SKINCARE
    "Oily+Detox/Exfoliating": {
        product: "Body Cleanser - Exfoliating Wash",
        slot: "Face Cleanser (AM/PM)",
        reason: "to control oil and unclog pores"
    },
    "Combination+Detox/Exfoliating": {
        product: "Body Cleanser - Exfoliating Wash",
        slot: "Face Cleanser (AM/PM)",
        reason: "to balance your combination skin and prevent breakouts"
    },
    "Dry+*": {
        product: "Body Cleanser - Gentle Sensitive Wash",
        slot: "Face Cleanser (AM/PM)",
        reason: "to gently cleanse without stripping moisture"
    },
    "Sensitive+*": {
        product: "Body Cleanser - Gentle Sensitive Wash",
        slot: "Face Cleanser (AM/PM)",
        reason: "to soothe and protect your sensitive skin"
    },
    "Normal+*": {
        product: "Body Cleanser - Gentle Sensitive Wash",
        slot: "Face Cleanser (AM/PM)",
        reason: "to maintain your skin's natural balance"
    },

    // Serums
    "Brightening": {
        product: "Face Serum - Brightening Vitamin C",
        slot: "Serum (AM)",
        reason: "to brighten and even out your skin tone"
    },
    "Anti-Wrinkle": {
        product: "Face Serum - Repair & Anti-Wrinkle",
        slot: "Serum (PM)",
        reason: "to target fine lines and boost firmness"
    },

    // Moisturizers
    "Dry+Barrier Repair/Hydration": {
        product: "Face Cream - Barrier Repair",
        slot: "Moisturizer (AM/PM)",
        reason: "to restore and strengthen your skin barrier"
    },
    "Sensitive+Barrier Repair/Hydration": {
        product: "Face Cream - Barrier Repair",
        slot: "Moisturizer (AM/PM)",
        reason: "to calm and repair your sensitive skin"
    },
    "Oily+Anti-Wrinkle": {
        product: "Face Cream - Anti-Wrinkle Peptide",
        slot: "Moisturizer (AM/PM)",
        reason: "to fight aging without adding excess oil"
    },
    "Combination+Anti-Wrinkle": {
        product: "Face Cream - Anti-Wrinkle Peptide",
        slot: "Moisturizer (AM/PM)",
        reason: "to target aging concerns while balancing your skin"
    },
    "Normal+Anti-Wrinkle": {
        product: "Face Cream - Anti-Wrinkle Peptide",
        slot: "Moisturizer (AM/PM)",
        reason: "to prevent and reduce signs of aging"
    },

    // Eye Care
    "Eye Concerns+AM": {
        product: "Eye Cream - De-Puffing Gel",
        slot: "Eye Cream (AM)",
        reason: "to reduce puffiness and refresh tired eyes"
    },
    "Eye Concerns+PM": {
        product: "Eye Cream - Brightening & Firming",
        slot: "Eye Cream (PM)",
        reason: "to brighten dark circles and firm the eye area"
    },

    // Sunscreen
    "Mineral SPF 30": {
        product: "Sunscreen - Mineral SPF 30",
        slot: "Sunscreen (AM)",
        reason: "to provide gentle, physical sun protection"
    },
    "Hybrid SPF 50+": {
        product: "Sunscreen - Hybrid SPF 50+",
        slot: "Sunscreen (AM)",
        reason: "to give you lightweight, high-level protection"
    },

    // Weekly Treatments
    "Detox/Exfoliating+Mask": {
        product: "Face Mask - Detox Clay Mask",
        slot: "Weekly Treatment",
        reason: "to deeply cleanse and purify your pores"
    },
    "Brightening+Mask": {
        product: "Face Mask - Hydration Glow Mask",
        slot: "Weekly Treatment",
        reason: "to boost radiance and hydration"
    },
    "Barrier Repair/Hydration+Mask": {
        product: "Face Mask - Hydration Glow Mask",
        slot: "Weekly Treatment",
        reason: "to intensely hydrate and restore your skin"
    },
    "General+Scrub": {
        product: "Face Scrub - Enzyme Exfoliant",
        slot: "Weekly Treatment",
        reason: "to gently remove dead skin and improve texture"
    },

    // HAIRCARE
    "Anti-Hair Fall+Shampoo": {
        product: "Shampoo - Anti-Hair Fall (Caffeine)",
        slot: "Shampoo",
        reason: "to strengthen hair and reduce hair fall"
    },
    "Clarifying/Balancing+Shampoo": {
        product: "Shampoo - Anti-Hair Fall (Caffeine)",
        slot: "Shampoo",
        reason: "to balance oily scalp and promote healthy growth"
    },
    "Moisture+Shampoo": {
        product: "Shampoo - Moisture Herbal",
        slot: "Shampoo",
        reason: "to gently cleanse and nourish dry hair"
    },

    "Repair+Conditioner": {
        product: "Conditioner - Protein Strength",
        slot: "Conditioner",
        reason: "to rebuild and strengthen damaged hair"
    },
    "Strength+Conditioner": {
        product: "Conditioner - Protein Strength",
        slot: "Conditioner",
        reason: "to fortify weak hair and add volume"
    },
    "Moisture/Frizz+Conditioner": {
        product: "Conditioner - Moisture & Frizz Control",
        slot: "Conditioner",
        reason: "to hydrate and smooth frizzy hair"
    },

    "Repair+HairMask": {
        product: "Hair Mask - Bond Repair",
        slot: "Hair Mask",
        reason: "to deeply repair and restore damaged bonds"
    },
    "Moisture/Frizz+HairMask": {
        product: "Hair Mask - Hydration Boost",
        slot: "Hair Mask",
        reason: "to intensely moisturize and control frizz"
    },

    "Anti-Hair Fall+ScalpSerum": {
        product: "Hair Serum - Scalp Growth Serum",
        slot: "Scalp Treatment",
        reason: "to stimulate growth and prevent hair loss"
    },
    "Shine+LeaveIn": {
        product: "Hair Serum - Leave-In Shine Serum",
        slot: "Leave-In Treatment",
        reason: "to add brilliant shine and smoothness"
    },
    "Moisture/Frizz+LeaveIn": {
        product: "Hair Serum - Leave-In Shine Serum",
        slot: "Leave-In Treatment",
        reason: "to control frizz and add lustrous shine"
    },

    // BODY & LIP
    "Gentle/Sensitive+BodyWash": {
        product: "Body Cleanser - Gentle Sensitive Wash",
        slot: "Body Cleanser",
        reason: "to gently cleanse sensitive body skin"
    },
    "Exfoliating+BodyWash": {
        product: "Body Cleanser - Exfoliating Wash",
        slot: "Body Cleanser",
        reason: "to smooth and refine rough, bumpy skin"
    },

    "Urea Repair+BodyMoisturizer": {
        product: "Body Moisturizer - Urea Repair Lotion",
        slot: "Body Moisturizer",
        reason: "to intensely repair very dry, rough patches"
    },
    "Hydration+BodyMoisturizer": {
        product: "Body Moisturizer - Hydration Glow Lotion",
        slot: "Body Moisturizer",
        reason: "to nourish and give your skin a healthy glow"
    },

    // Default lip products
    "Default+LipRepair": {
        product: "Lip Balm - Repair Balm",
        slot: "Lip Care",
        reason: "to heal and protect your lips"
    },
    "Default+LipPlump": {
        product: "Lip Balm - Plumping Tint Balm",
        slot: "Lip Care",
        reason: "to add subtle color and fullness"
    }
};

// Function to generate skincare recommendations based on quiz answers
export const generateSkincareRecommendations = (answers) => {
    const recommendations = {
        skincare: {
            am: [],
            pm: [],
            weekly: []
        },
        bodycare: [],
        lipcare: []
    };

    // Extract key mappings from answers
    const skinType = answers[1]?.mapping || "Normal";
    const primarySkinConcern = answers[2]?.mapping || "Brightening";
    const secondarySkinConcern = answers[3]?.mapping || "None";
    const sunscreenType = answers[4]?.mapping || "Hybrid SPF 50+";
    const bodyConcern = answers[5]?.mapping || "Hydration";

    // Generate skincare recommendations
    // Face Cleanser
    const cleanserKey = `${skinType}+${primarySkinConcern}`;
    const cleanserFallback = `${skinType}+*`;
    if (productMapping[cleanserKey]) {
        recommendations.skincare.am.push(productMapping[cleanserKey]);
        recommendations.skincare.pm.push(productMapping[cleanserKey]);
    } else if (productMapping[cleanserFallback]) {
        recommendations.skincare.am.push(productMapping[cleanserFallback]);
        recommendations.skincare.pm.push(productMapping[cleanserFallback]);
    }

    // Serums
    if (productMapping[primarySkinConcern]) {
        if (primarySkinConcern === "Brightening") {
            recommendations.skincare.am.push(productMapping[primarySkinConcern]);
        } else {
            recommendations.skincare.pm.push(productMapping[primarySkinConcern]);
        }
    }

    if (secondarySkinConcern !== "None" && productMapping[secondarySkinConcern]) {
        if (secondarySkinConcern === "Brightening") {
            recommendations.skincare.am.push(productMapping[secondarySkinConcern]);
        } else {
            recommendations.skincare.pm.push(productMapping[secondarySkinConcern]);
        }
    }

    // Moisturizers
    const moisturizerKey = `${skinType}+${primarySkinConcern}`;
    if (productMapping[moisturizerKey]) {
        recommendations.skincare.am.push(productMapping[moisturizerKey]);
        recommendations.skincare.pm.push(productMapping[moisturizerKey]);
    }

    // Eye Care
    if (primarySkinConcern === "Eye Concerns" || secondarySkinConcern === "Eye Concerns") {
        recommendations.skincare.am.push(productMapping["Eye Concerns+AM"]);
        recommendations.skincare.pm.push(productMapping["Eye Concerns+PM"]);
    }

    // Sunscreen
    if (productMapping[sunscreenType]) {
        recommendations.skincare.am.push(productMapping[sunscreenType]);
    }

    // Weekly treatments
    if (primarySkinConcern === "Detox/Exfoliating") {
        recommendations.skincare.weekly.push(productMapping["Detox/Exfoliating+Mask"]);
    } else if (primarySkinConcern === "Brightening" || primarySkinConcern === "Barrier Repair/Hydration") {
        recommendations.skincare.weekly.push(productMapping[`${primarySkinConcern}+Mask`]);
    }

    recommendations.skincare.weekly.push(productMapping["General+Scrub"]);

    // Generate bodycare recommendations
    const bodyWashKey = `${bodyConcern}+BodyWash`;
    if (productMapping[bodyWashKey]) {
        recommendations.bodycare.push(productMapping[bodyWashKey]);
    }

    const bodyMoisturizerKey = `${bodyConcern}+BodyMoisturizer`;
    if (productMapping[bodyMoisturizerKey]) {
        recommendations.bodycare.push(productMapping[bodyMoisturizerKey]);
    }

    // Add default lip care
    recommendations.lipcare.push(productMapping["Default+LipRepair"]);
    recommendations.lipcare.push(productMapping["Default+LipPlump"]);

    return recommendations;
};

// Function to generate haircare recommendations based on quiz answers
export const generateHaircareRecommendations = (answers) => {
    const recommendations = {
        haircare: []
    };

    // Extract key mappings from answers
    const scalpConcern = answers[1]?.mapping || "Moisture";
    const hairConcern = answers[2]?.mapping || "Moisture/Frizz";

    // Generate haircare recommendations
    const shampooKey = `${scalpConcern}+Shampoo`;
    if (productMapping[shampooKey]) {
        recommendations.haircare.push(productMapping[shampooKey]);
    }

    const conditionerKey = `${hairConcern}+Conditioner`;
    if (productMapping[conditionerKey]) {
        recommendations.haircare.push(productMapping[conditionerKey]);
    }

    const hairMaskKey = `${hairConcern}+HairMask`;
    if (productMapping[hairMaskKey]) {
        recommendations.haircare.push(productMapping[hairMaskKey]);
    }

    if (scalpConcern === "Anti-Hair Fall") {
        recommendations.haircare.push(productMapping["Anti-Hair Fall+ScalpSerum"]);
    }

    if (hairConcern === "Shine" || hairConcern === "Moisture/Frizz") {
        recommendations.haircare.push(productMapping[`${hairConcern}+LeaveIn`]);
    }

    return recommendations;
};

// Function to generate product recommendations based on quiz answers (legacy)
export const generateRecommendations = (answers) => {
    const recommendations = {
        skincare: {
            am: [],
            pm: [],
            weekly: []
        },
        haircare: [],
        bodycare: [],
        lipcare: []
    };

    // Extract key mappings from answers
    const skinType = answers[1]?.mapping || "Normal";
    const primarySkinConcern = answers[2]?.mapping || "Brightening";
    const secondarySkinConcern = answers[3]?.mapping || "None";
    const sunscreenType = answers[4]?.mapping || "Hybrid SPF 50+";
    const scalpConcern = answers[5]?.mapping || "Moisture";
    const hairConcern = answers[6]?.mapping || "Moisture/Frizz";
    const bodyConcern = answers[7]?.mapping || "Hydration";

    // Generate skincare recommendations
    // Face Cleanser
    const cleanserKey = `${skinType}+${primarySkinConcern}`;
    const cleanserFallback = `${skinType}+*`;
    if (productMapping[cleanserKey]) {
        recommendations.skincare.am.push(productMapping[cleanserKey]);
        recommendations.skincare.pm.push(productMapping[cleanserKey]);
    } else if (productMapping[cleanserFallback]) {
        recommendations.skincare.am.push(productMapping[cleanserFallback]);
        recommendations.skincare.pm.push(productMapping[cleanserFallback]);
    }

    // Serums
    if (productMapping[primarySkinConcern]) {
        if (primarySkinConcern === "Brightening") {
            recommendations.skincare.am.push(productMapping[primarySkinConcern]);
        } else {
            recommendations.skincare.pm.push(productMapping[primarySkinConcern]);
        }
    }

    if (secondarySkinConcern !== "None" && productMapping[secondarySkinConcern]) {
        if (secondarySkinConcern === "Brightening") {
            recommendations.skincare.am.push(productMapping[secondarySkinConcern]);
        } else {
            recommendations.skincare.pm.push(productMapping[secondarySkinConcern]);
        }
    }

    // Moisturizers
    const moisturizerKey = `${skinType}+${primarySkinConcern}`;
    if (productMapping[moisturizerKey]) {
        recommendations.skincare.am.push(productMapping[moisturizerKey]);
        recommendations.skincare.pm.push(productMapping[moisturizerKey]);
    }

    // Eye Care
    if (primarySkinConcern === "Eye Concerns" || secondarySkinConcern === "Eye Concerns") {
        recommendations.skincare.am.push(productMapping["Eye Concerns+AM"]);
        recommendations.skincare.pm.push(productMapping["Eye Concerns+PM"]);
    }

    // Sunscreen
    if (productMapping[sunscreenType]) {
        recommendations.skincare.am.push(productMapping[sunscreenType]);
    }

    // Weekly treatments
    if (primarySkinConcern === "Detox/Exfoliating") {
        recommendations.skincare.weekly.push(productMapping["Detox/Exfoliating+Mask"]);
    } else if (primarySkinConcern === "Brightening" || primarySkinConcern === "Barrier Repair/Hydration") {
        recommendations.skincare.weekly.push(productMapping[`${primarySkinConcern}+Mask`]);
    }

    recommendations.skincare.weekly.push(productMapping["General+Scrub"]);

    // Generate haircare recommendations
    const shampooKey = `${scalpConcern}+Shampoo`;
    if (productMapping[shampooKey]) {
        recommendations.haircare.push(productMapping[shampooKey]);
    }

    const conditionerKey = `${hairConcern}+Conditioner`;
    if (productMapping[conditionerKey]) {
        recommendations.haircare.push(productMapping[conditionerKey]);
    }

    const hairMaskKey = `${hairConcern}+HairMask`;
    if (productMapping[hairMaskKey]) {
        recommendations.haircare.push(productMapping[hairMaskKey]);
    }

    if (scalpConcern === "Anti-Hair Fall") {
        recommendations.haircare.push(productMapping["Anti-Hair Fall+ScalpSerum"]);
    }

    if (hairConcern === "Shine" || hairConcern === "Moisture/Frizz") {
        recommendations.haircare.push(productMapping[`${hairConcern}+LeaveIn`]);
    }

    // Generate bodycare recommendations
    const bodyWashKey = `${bodyConcern}+BodyWash`;
    if (productMapping[bodyWashKey]) {
        recommendations.bodycare.push(productMapping[bodyWashKey]);
    }

    const bodyMoisturizerKey = `${bodyConcern}+BodyMoisturizer`;
    if (productMapping[bodyMoisturizerKey]) {
        recommendations.bodycare.push(productMapping[bodyMoisturizerKey]);
    }

    // Add default lip care
    recommendations.lipcare.push(productMapping["Default+LipRepair"]);
    recommendations.lipcare.push(productMapping["Default+LipPlump"]);

    return recommendations;
};