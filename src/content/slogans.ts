// Slogans sourced from:
//   Root text: Geshe Chekawa Yeshe Dorje, trans. Adam Pearcey (EN), Juliane Wenzel (DE)
//   Explanations: Gyalse Tokme Zangpo (commentary) and Jamyang Khyentse Chökyi Lodrö (notes),
//   both translated by Adam Pearcey. All published by Lotsawa House under CC BY-NC 4.0.
//
// To edit content: modify the entries below.
// To add a slogan: append an entry with a unique id and matching attributionKey.
// To add a language: add a new locale block alongside 'en' and 'de'.

export type SloganLocale = {
  slogan: string;
  explanation: string;
};

export type Slogan = {
  id: number;
  point: number; // 1–7, corresponding to the Seven Points of Mind Training
  en: SloganLocale;
  de: SloganLocale;
  attributionKey: string;
};

export const slogans: Slogan[] = [
  // ─── Point 1: The Preliminaries ─────────────────────────────────────────────
  {
    id: 1,
    point: 1,
    en: {
      slogan: 'First, train in the preliminaries.',
      explanation:
        'Train in three contemplations: the difficulty of finding freedoms and advantages, death and impermanence, and the trials of saṃsāra. These create the foundation for all further practice.',
    },
    de: {
      slogan: 'Übe als erstes die Vorbereitenden Übungen.',
      explanation:
        'Übe drei Betrachtungen: die Seltenheit des kostbaren Menschenlebens, Tod und Unbeständigkeit sowie die Leiden des Saṃsāra. Diese bilden die Grundlage für alle weiteren Praktiken.',
    },
    attributionKey: 'root-text',
  },

  // ─── Point 2: The Main Practice — Ultimate Bodhicitta ───────────────────────
  {
    id: 2,
    point: 2,
    en: {
      slogan: 'Consider all things and events as dreamlike.',
      explanation:
        'Appearances are delusory perceptions of mind with no objective reality. Recognizing their dream-like nature frees you from clinging to them as solid or real.',
    },
    de: {
      slogan: 'Betrachte alle Dinge und Begebenheiten als traumgleich.',
      explanation:
        'Erscheinungen sind trügerische Wahrnehmungen des Geistes ohne objektive Realität. Das Erkennen ihrer traumgleichen Natur befreit uns vom Festhalten an ihrer Solidität.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 3,
    point: 2,
    en: {
      slogan: 'Examine the nature of unborn awareness.',
      explanation:
        'Mind is empty of arising, remaining, and ceasing; it has no fixed character. Resting in this recognition is the ultimate training.',
    },
    de: {
      slogan: 'Untersuche die Natur der ungeborenen Bewusstheit.',
      explanation:
        'Der Geist ist leer von Entstehen, Verweilen und Vergehen; er hat keinen festen Charakter. Im Erkennen dieser Wahrheit zu ruhen ist das höchste Training.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 4,
    point: 2,
    en: {
      slogan: 'Let even the antidote be freed in its own place.',
      explanation:
        'Even the antidote to delusion has no true nature. Recognize that the remedy itself need not be held onto — let it dissolve naturally.',
    },
    de: {
      slogan: 'Lass selbst das Gegenmittel in sich selbst befreit sein.',
      explanation:
        'Auch das Gegenmittel gegen Täuschung hat keine wahre Natur. Erkenne, dass das Heilmittel selbst nicht festgehalten werden muss — lass es sich natürlich auflösen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 5,
    point: 2,
    en: {
      slogan: 'Rest in the ālaya, the essence.',
      explanation:
        'Settle with lucid clarity in the ground of experience beyond thought. This is resting in the fundamental nature of mind without conceptual elaboration.',
    },
    de: {
      slogan: 'Verweile in ālaya, der Essenz.',
      explanation:
        'Ruhe mit strahlender Klarheit im Grund der Erfahrung jenseits des Gedankens. Dies ist das Ruhen in der grundlegenden Natur des Geistes ohne begriffliche Ausschmückung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 6,
    point: 2,
    en: {
      slogan: 'Between sessions, be a conjurer of illusions.',
      explanation:
        'During post-meditation, carry the recognition that all appearances are unreal into daily activity. View everything as a magician\'s display — vivid but without solidity.',
    },
    de: {
      slogan: 'Zwischen den Sitzungen sei ein Beschwörer der Illusionen.',
      explanation:
        'Bringe zwischen den Meditationssitzungen die Erkenntnis, dass alle Erscheinungen unwirklich sind, in den Alltag. Betrachte alles wie die Vorstellung eines Zauberers — lebendig, aber ohne Festigkeit.',
    },
    attributionKey: 'commentary',
  },

  // ─── Point 2: The Main Practice — Relative Bodhicitta ───────────────────────
  {
    id: 7,
    point: 2,
    en: {
      slogan: 'Train in the two — giving and taking — alternately.',
      explanation:
        'Begin with loving kindness and compassion, then practice tonglen: exchanging self for others. As you breathe out, give your happiness to all beings; as you breathe in, take on their suffering.',
    },
    de: {
      slogan: 'Übe die beiden — Geben und Nehmen — abwechselnd.',
      explanation:
        'Beginne mit liebevoller Güte und Mitgefühl, und übe dann Tonglen: das Austauschen von sich selbst mit anderen. Beim Ausatmen gib dein Glück an alle Wesen; beim Einatmen nimm ihr Leiden auf dich.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 8,
    point: 2,
    en: {
      slogan: 'These two are to be mounted on the breath.',
      explanation:
        'As you breathe out, send your happiness and virtue to all beings. As you breathe in, take on their suffering and negativity. The breath is the vehicle for this practice.',
    },
    de: {
      slogan: 'Diese beiden sollen mit dem Atem einhergehen.',
      explanation:
        'Beim Ausatmen sende dein Glück und deine Verdienste an alle Wesen. Beim Einatmen nimm ihr Leiden und ihre Negativität auf dich. Der Atem ist das Fahrzeug dieser Praxis.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 9,
    point: 2,
    en: {
      slogan: 'Three objects, three poisons and three sources of virtue.',
      explanation:
        'Work with the three objects (pleasant, unpleasant, neutral) that trigger the three poisons (attachment, aversion, indifference). Taking these on cultivates the three sources of virtue.',
    },
    de: {
      slogan: 'Drei Objekte, drei Gifte und drei Quellen der Tugend.',
      explanation:
        'Arbeite mit den drei Objekten (angenehm, unangenehm, neutral), die die drei Gifte (Anhaftung, Abneigung, Gleichgültigkeit) auslösen. Ihre Aufnahme kultiviert die drei Quellen der Tugend.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 10,
    point: 2,
    en: {
      slogan: 'In all activities, train by applying slogans.',
      explanation:
        'Throughout the day, recite and apply the mind-training instructions. Let them guide how you meet whatever arises — especially difficulties.',
    },
    de: {
      slogan: 'Übe bei allen Aktivitäten die Anwendung von Leitsätzen.',
      explanation:
        'Rezitiere und wende die Unterweisungen des Geistestrainings den ganzen Tag über an. Lass sie leiten, wie du allem begegnest, was entsteht — besonders Schwierigkeiten.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 11,
    point: 2,
    en: {
      slogan: 'Begin the process of taking with yourself.',
      explanation:
        'Start tonglen practice by taking on your own future suffering before taking on others\' misery. This builds the capacity and willingness needed.',
    },
    de: {
      slogan: 'Beginne mit der Übung des Nehmens bei Dir selbst.',
      explanation:
        'Beginne die Tonglen-Praxis damit, dein eigenes zukünftiges Leiden auf dich zu nehmen, bevor du das Leid anderer aufnimmst. Dies baut die benötigte Fähigkeit und Bereitschaft auf.',
    },
    attributionKey: 'commentary',
  },

  // ─── Point 3: Transforming Adversity ────────────────────────────────────────
  {
    id: 12,
    point: 3,
    en: {
      slogan: 'When all the world is filled with evil, transform adversity into the path of enlightenment.',
      explanation:
        'When the environment, the age, and beings seem oppressive, use the practice to transform these conditions rather than be overwhelmed by them.',
    },
    de: {
      slogan: 'Wenn die ganze Welt mit Leid erfüllt ist, transformiere Widrigkeiten in den Weg zur Erleuchtung.',
      explanation:
        'Wenn Umgebung, Zeitalter und Wesen bedrückend erscheinen, nutze die Praxis, um diese Bedingungen zu transformieren, anstatt von ihnen überwältigt zu werden.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 13,
    point: 3,
    en: {
      slogan: 'Drive all blames into one.',
      explanation:
        'Recognize that all suffering arises from self-grasping, not from others. When something goes wrong, trace it back to the root of self-cherishing rather than blaming external circumstances.',
    },
    de: {
      slogan: 'Suche alle Schuld in einem.',
      explanation:
        'Erkenne, dass alles Leiden aus dem Festhalten am Selbst entsteht, nicht von anderen. Wenn etwas schiefgeht, führe es auf die Wurzel der Selbstbezogenheit zurück, anstatt äußere Umstände zu beschuldigen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 14,
    point: 3,
    en: {
      slogan: 'Meditate on the great kindness of all.',
      explanation:
        'All beings have been your kind parents in past lives. Recognize their fundamental kindness and cultivate gratitude toward all, even those who seem hostile.',
    },
    de: {
      slogan: 'Meditiere auf die große Güte aller.',
      explanation:
        'Alle Wesen waren in vergangenen Leben deine liebevollen Eltern. Erkenne ihre grundlegende Güte und kultiviere Dankbarkeit gegenüber allen, auch gegenüber denen, die feindlich erscheinen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 15,
    point: 3,
    en: {
      slogan: 'Meditating on delusory perceptions as the four kāyas is the unsurpassable śūnyatā protection.',
      explanation:
        'View afflictions and difficulties as lacking true reality and recognize them as the four buddha-bodies. This transforms obstacles into opportunities for realization.',
    },
    de: {
      slogan: 'Auf die trügerischen Wahrnehmungen als die vier kāyas zu meditieren ist der unübertreffliche śūnyatā-Schutz.',
      explanation:
        'Betrachte Störgefühle und Schwierigkeiten als ohne wahre Realität und erkenne sie als die vier Buddha-Körper. Dies verwandelt Hindernisse in Möglichkeiten zur Verwirklichung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 16,
    point: 3,
    en: {
      slogan: 'The fourfold practice is the best of methods.',
      explanation:
        'Four practices: (1) accumulating merit through offerings; (2) purifying negativity through the four powers; (3) offering to harmful influences with compassion; (4) offering to dharma protectors.',
    },
    de: {
      slogan: 'Die vierfache Praxis ist die beste Methode.',
      explanation:
        'Vier Praktiken: (1) Verdienste ansammeln durch Opfergaben; (2) Negativität durch die vier Kräfte reinigen; (3) schädlichen Einflüssen mit Mitgefühl opfern; (4) Dharma-Beschützern opfern.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 17,
    point: 3,
    en: {
      slogan: 'Whatever you encounter, apply the practice.',
      explanation:
        'Transform any adversity — illness, conflict, loss — into the path through compassion and the recognition of emptiness. Nothing is excluded from practice.',
    },
    de: {
      slogan: 'Was auch immer Dir begegnet, wende die Praxis an.',
      explanation:
        'Verwandle jede Widrigkeit — Krankheit, Konflikt, Verlust — durch Mitgefühl und das Erkennen der Leerheit in den Weg. Nichts ist von der Praxis ausgeschlossen.',
    },
    attributionKey: 'root-text',
  },

  // ─── Point 4: Applying the Practice throughout Life ─────────────────────────
  {
    id: 18,
    point: 4,
    en: {
      slogan: 'The essence of the instruction, briefly stated, is to apply yourself to the five strengths.',
      explanation:
        'The five strengths: (1) impetus — resolve never to part from bodhicitta; (2) familiarization — train repeatedly; (3) wholesome seeds — accumulate merit; (4) revulsion — reflect on the harm of self-cherishing; (5) aspiration — make aspirations after virtuous deeds.',
    },
    de: {
      slogan: 'Die Essenz der Unterweisungen ist, kurz gesagt, die Anwendung der fünf Kräfte.',
      explanation:
        'Die fünf Kräfte: (1) Antrieb — entschließe dich, niemals vom Bodhicitta zu weichen; (2) Vertrautheit — trainiere wiederholt; (3) heilsame Samen — sammle Verdienste; (4) Abscheu — besinne dich auf den Schaden der Selbstbezogenheit; (5) Aspiration — treffe Wünsche nach tugendhaften Taten.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 19,
    point: 4,
    en: {
      slogan: 'The Mahāyāna advice for transference involves the same five strengths. Conduct is important.',
      explanation:
        'At the moment of death, apply the same five strengths with special conduct: lie on the right side, block the right nostril, and continue tonglen practice until the last moment.',
    },
    de: {
      slogan: 'Der Mahāyāna-Rat für die Übertragung umfasst dieselben fünf Kräfte. Verhalten ist wichtig.',
      explanation:
        'Im Moment des Todes wende dieselben fünf Kräfte mit besonderem Verhalten an: Lege dich auf die rechte Seite, verschließe das rechte Nasenloch und führe die Tonglen-Praxis bis zum letzten Moment fort.',
    },
    attributionKey: 'commentary',
  },

  // ─── Point 5: The Measure of Mind Training ──────────────────────────────────
  {
    id: 20,
    point: 5,
    en: {
      slogan: 'All teachings share a single purpose.',
      explanation:
        'All dharma teachings aim at one thing: taming self-grasping. Use this as the measure of whether your practice is working — is it reducing self-cherishing?',
    },
    de: {
      slogan: 'Alle Belehrungen haben das gleiche Ziel.',
      explanation:
        'Alle Dharma-Belehrungen zielen auf eine Sache ab: das Zähmen des Festhaltens am Selbst. Nutze dies als Maß dafür, ob deine Praxis wirkt — verringert sie die Selbstbezogenheit?',
    },
    attributionKey: 'notes',
  },
  {
    id: 21,
    point: 5,
    en: {
      slogan: 'Of the two witnesses, rely upon the principal one.',
      explanation:
        'Trust your own honest self-examination rather than others\' opinions about your practice. You are the most reliable witness to the state of your own mind.',
    },
    de: {
      slogan: 'Bei zwei Zeugen verlass Dich auf den Hauptzeugen.',
      explanation:
        'Vertraue deiner eigenen ehrlichen Selbstprüfung statt der Meinung anderer über deine Praxis. Du bist der zuverlässigste Zeuge für den Zustand deines eigenen Geistes.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 22,
    point: 5,
    en: {
      slogan: 'Always maintain only a joyful attitude.',
      explanation:
        'If you can see adversity as an ally in practice, this shows mental mastery. Contentment and lightness of heart are signs that mind training is taking effect.',
    },
    de: {
      slogan: 'Bewahre immer eine freudvolle Haltung.',
      explanation:
        'Wenn du Widrigkeiten als Verbündete in der Praxis betrachten kannst, zeigt dies die Meisterschaft des Geistes. Zufriedenheit und Leichtigkeit des Herzens sind Zeichen, dass das Geistestraining wirkt.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 23,
    point: 5,
    en: {
      slogan: 'If this can be done even when distracted, you are proficient.',
      explanation:
        'Like a skilled rider who stays balanced even on rough ground, if you can apply the practice naturally during distraction, your training has become stable.',
    },
    de: {
      slogan: 'Wenn dies auch bei Ablenkung gehalten werden kann, bist Du erfahren.',
      explanation:
        'Wie ein geschickter Reiter, der auch auf unebenem Boden das Gleichgewicht hält: Wenn du die Praxis auch bei Ablenkung natürlich anwenden kannst, ist dein Training stabil geworden.',
    },
    attributionKey: 'commentary',
  },

  // ─── Point 6: The Commitments of Mind Training ──────────────────────────────
  {
    id: 24,
    point: 6,
    en: {
      slogan: 'Train constantly in three basic principles.',
      explanation:
        'Three principles: (1) do not transgress your commitments; (2) do not be reckless or embarrass others; (3) do not fall into partiality — apply practice equally to all.',
    },
    de: {
      slogan: 'Übe stets die drei grundlegenden Prinzipien.',
      explanation:
        'Drei Prinzipien: (1) Übertriff nicht deine Verpflichtungen; (2) sei nicht rücksichtslos und bringe andere nicht in Verlegenheit; (3) verfalle nicht in Parteilichkeit — wende die Praxis auf alle gleich an.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 25,
    point: 6,
    en: {
      slogan: 'Change your attitude, but remain natural.',
      explanation:
        'Inwardly transform self-cherishing into cherishing others, but outwardly maintain ordinary, natural conduct. Don\'t display a special spiritual persona.',
    },
    de: {
      slogan: 'Ändere Deine Haltung, aber bleibe natürlich.',
      explanation:
        'Verwandle innerlich die Selbstbezogenheit in die Fürsorge für andere, aber behalte äußerlich ein gewöhnliches, natürliches Verhalten bei. Zeige keine besondere spirituelle Persona.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 26,
    point: 6,
    en: {
      slogan: 'Don\'t speak of injured limbs.',
      explanation:
        'Do not point out others\' physical disabilities or faults in order to embarrass them. Maintain kindness in speech.',
    },
    de: {
      slogan: 'Sprich nicht über verletzte Glieder.',
      explanation:
        'Weise nicht auf körperliche Gebrechen oder Fehler anderer hin, um sie in Verlegenheit zu bringen. Wahre Güte in der Sprache.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 27,
    point: 6,
    en: {
      slogan: 'Don\'t ponder others\' flaws.',
      explanation:
        'Attribute perceived faults to your own impure perception rather than dwelling on others\' shortcomings. Your perception of a flaw reflects your own mind.',
    },
    de: {
      slogan: 'Beschäftige Dich nicht mit den Makeln anderer.',
      explanation:
        'Führe wahrgenommene Fehler auf deine eigene unreine Wahrnehmung zurück, anstatt bei den Schwächen anderer zu verweilen. Deine Wahrnehmung eines Fehlers spiegelt deinen eigenen Geist wider.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 28,
    point: 6,
    en: {
      slogan: 'Train first with the strongest destructive emotions.',
      explanation:
        'Identify your most powerful affliction — anger, jealousy, pride — and address it first. Taming your greatest obstacle yields the greatest benefit.',
    },
    de: {
      slogan: 'Übe zuerst mit den stärksten störenden Gefühlen.',
      explanation:
        'Erkenne dein mächtigstes Störgefühl — Ärger, Eifersucht, Stolz — und befasse dich zuerst damit. Das Zähmen deines größten Hindernisses bringt den größten Nutzen.',
    },
    attributionKey: 'notes',
  },
  {
    id: 29,
    point: 6,
    en: {
      slogan: 'Abandon any expectations of results.',
      explanation:
        'Give up selfish concerns about gaining respect, health, or favorable rebirths from practice. Act purely for the benefit of others without seeking personal reward.',
    },
    de: {
      slogan: 'Lass jegliche Erwartungen an Ergebnisse los.',
      explanation:
        'Gib eigennützige Sorgen um Ansehen, Gesundheit oder günstige Wiedergeburten durch die Praxis auf. Handle rein zum Wohl anderer, ohne persönliche Belohnung zu suchen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 30,
    point: 6,
    en: {
      slogan: 'Give up poisonous food.',
      explanation:
        'Abandon virtuous activity that is contaminated by the poison of self-cherishing or desire for recognition. Such actions undermine the purpose of practice.',
    },
    de: {
      slogan: 'Gib das vergiftete Essen auf.',
      explanation:
        'Lass tugendhafte Handlungen los, die durch das Gift der Selbstbezogenheit oder den Wunsch nach Anerkennung befleckt sind. Solche Handlungen untergraben den Zweck der Praxis.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 31,
    point: 6,
    en: {
      slogan: 'Don\'t be so loyal to the cause.',
      explanation:
        'Do not hold grudges. When someone harms you, do not nurse resentment while waiting for an opportunity to retaliate.',
    },
    de: {
      slogan: 'Sei nicht so loyal mit der Ursache.',
      explanation:
        'Hege keine Groll. Wenn jemand dir schadet, pflege keine Verbitterung, während du auf eine Gelegenheit zur Vergeltung wartest.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 32,
    point: 6,
    en: {
      slogan: 'Don\'t lash out in retaliation.',
      explanation:
        'When insulted or harmed, do not respond with harsh words or actions. Retaliation only perpetuates conflict and undermines the training.',
    },
    de: {
      slogan: 'Übe nicht Vergeltung.',
      explanation:
        'Wenn du beleidigt oder verletzt wirst, reagiere nicht mit harten Worten oder Handlungen. Vergeltung perpetuiert nur Konflikte und untergräbt das Training.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 33,
    point: 6,
    en: {
      slogan: 'Don\'t lie in ambush.',
      explanation:
        'Do not dwell on a harm done to you while waiting for the right moment to retaliate. Let it go rather than nursing the wound.',
    },
    de: {
      slogan: 'Liege nicht im Hinterhalt.',
      explanation:
        'Verweile nicht bei einem dir zugefügten Schaden, während du auf den richtigen Moment zur Vergeltung wartest. Lass es los, anstatt die Wunde zu pflegen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 34,
    point: 6,
    en: {
      slogan: 'Don\'t strike a vulnerable point.',
      explanation:
        'Do not expose another person\'s hidden faults or weaknesses to harm them. This applies especially to using someone\'s confidences against them.',
    },
    de: {
      slogan: 'Berühre nicht einen wunden Punkt.',
      explanation:
        'Enthülle nicht die verborgenen Fehler oder Schwächen einer anderen Person, um ihr zu schaden. Dies gilt besonders für die Verwendung von Vertrauen gegen jemanden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 35,
    point: 6,
    en: {
      slogan: 'Don\'t transfer the ox\'s burden to the cow.',
      explanation:
        'Do not transfer your own responsibilities, mistakes, or burdens onto others who are less able to bear them.',
    },
    de: {
      slogan: 'Bürde nicht die Last eines Ochsen einer Kuh auf.',
      explanation:
        'Übertrage deine eigenen Verantwortlichkeiten, Fehler oder Lasten nicht auf andere, die sie weniger gut tragen können.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 36,
    point: 6,
    en: {
      slogan: 'Don\'t be competitive.',
      explanation:
        'Avoid scheming to acquire possessions, reputation, or praise that are commonly available. Give up the drive to beat others.',
    },
    de: {
      slogan: 'Wetteifere nicht mit anderen.',
      explanation:
        'Vermeide es, durch Ränke Besitz, Ruf oder Lob anzustreben, der für alle zugänglich ist. Gib den Drang auf, andere zu übertreffen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 37,
    point: 6,
    en: {
      slogan: 'Don\'t misperform the rites.',
      explanation:
        'Practice with genuine intention to eliminate self-cherishing. Misperforming means going through spiritual motions while secretly serving your own ego.',
    },
    de: {
      slogan: 'Führe die Riten nicht falsch aus.',
      explanation:
        'Praktiziere mit echter Absicht, die Selbstbezogenheit zu beseitigen. Falsch Ausführen bedeutet, spirituelle Formen durchzugehen, während man heimlich dem eigenen Ego dient.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 38,
    point: 6,
    en: {
      slogan: 'Don\'t reduce gods to demons.',
      explanation:
        'Do not let pride or arrogance arise from your spiritual practice. Gaining wisdom and merit that feeds the ego is turning a god into a demon.',
    },
    de: {
      slogan: 'Reduziere Götter nicht auf Dämonen.',
      explanation:
        'Lass keinen Stolz oder Arroganz aus deiner spirituellen Praxis entstehen. Weisheit und Verdienst anzusammeln, die das Ego nähren, bedeutet, einen Gott in einen Dämon zu verwandeln.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 39,
    point: 6,
    en: {
      slogan: 'Don\'t seek others\' misery as crutches of your own happiness.',
      explanation:
        'Do not wish for others to suffer misfortune so you can benefit from or feel superior to their situation. True happiness cannot be built on others\' misery.',
    },
    de: {
      slogan: 'Suche nicht das Elend anderer als Krücke für Dein eigenes Glück.',
      explanation:
        'Wünsche nicht, dass andere Unglück erleiden, damit du von ihrer Situation profitieren oder dich ihr überlegen fühlen kannst. Wahres Glück kann nicht auf dem Elend anderer aufgebaut werden.',
    },
    attributionKey: 'commentary',
  },

  // ─── Point 7: The Precepts of Mind Training ─────────────────────────────────
  {
    id: 40,
    point: 7,
    en: {
      slogan: 'Do everything with a single intention.',
      explanation:
        'Whatever you do — eating, walking, working — dedicate it with the intention to benefit all beings. This single intention purifies all activity.',
    },
    de: {
      slogan: 'Tue alles mit einer einzigen Absicht.',
      explanation:
        'Was auch immer du tust — essen, gehen, arbeiten — widme es der Absicht, allen Wesen zu nützen. Diese einzige Absicht reinigt alle Aktivitäten.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 41,
    point: 7,
    en: {
      slogan: 'Counter all adversity with a single remedy.',
      explanation:
        'When difficulties arise, apply one remedy: the compassion of tonglen and the recognition of emptiness. One medicine for all afflictions.',
    },
    de: {
      slogan: 'Begegne allen Widrigkeiten mit einem einzigen Gegenmittel.',
      explanation:
        'Wenn Schwierigkeiten entstehen, wende ein Gegenmittel an: das Mitgefühl des Tonglen und das Erkennen der Leerheit. Eine Medizin für alle Leiden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 42,
    point: 7,
    en: {
      slogan: 'Two tasks: one at the beginning and one at the end.',
      explanation:
        'In the morning, set your motivation: "Today I will not give in to self-cherishing." In the evening, review: "Did I maintain bodhicitta? What needs correction?"',
    },
    de: {
      slogan: 'Zwei Aufgaben: Eine am Anfang und eine am Ende.',
      explanation:
        'Setze morgens deine Motivation: "Heute werde ich der Selbstbezogenheit nicht nachgeben." Überprüfe abends: "Habe ich Bodhicitta aufrechterhalten? Was braucht Korrektur?"',
    },
    attributionKey: 'notes',
  },
  {
    id: 43,
    point: 7,
    en: {
      slogan: 'Whichever of the two occurs, be patient.',
      explanation:
        'Whether prosperity or hardship comes, avoid arrogance in good times and despondency in bad. Practice equanimity with whatever arises.',
    },
    de: {
      slogan: 'Egal, was von den beiden erscheint, sei geduldig.',
      explanation:
        'Ob Wohlstand oder Schwierigkeiten kommen — vermeide Arroganz in guten Zeiten und Mutlosigkeit in schlechten. Übe Gleichmut mit allem, was entsteht.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 44,
    point: 7,
    en: {
      slogan: 'Keep the two, even at your life\'s expense.',
      explanation:
        'Guard both your general dharma commitments and your mind-training commitments even if it costs your life. These are the most precious things you have.',
    },
    de: {
      slogan: 'Halte die beiden, selbst unter Einsatz Deines Lebens.',
      explanation:
        'Hüte sowohl deine allgemeinen Dharma-Verpflichtungen als auch deine Geistestrainings-Verpflichtungen, auch wenn es dein Leben kostet. Diese sind das Wertvollste, was du hast.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 45,
    point: 7,
    en: {
      slogan: 'Train in the three difficulties.',
      explanation:
        'Three stages: (1) recognize the affliction arising; (2) apply the antidote in the middle; (3) ensure the affliction does not arise again. Each step is difficult — train in all three.',
    },
    de: {
      slogan: 'Übe Dich in den drei Schwierigkeiten.',
      explanation:
        'Drei Stufen: (1) das entstehende Störgefühl erkennen; (2) in der Mitte das Gegenmittel anwenden; (3) sicherstellen, dass das Störgefühl nicht wieder entsteht. Jeder Schritt ist schwierig — trainiere in allen dreien.',
    },
    attributionKey: 'notes',
  },
  {
    id: 46,
    point: 7,
    en: {
      slogan: 'Acquire the three main provisions.',
      explanation:
        'Three essentials: (1) meet a qualified teacher; (2) practice authentically; (3) gather conducive conditions. These are the provisions needed for the journey.',
    },
    de: {
      slogan: 'Erstrebe die drei Vorbedingungen.',
      explanation:
        'Drei Wesentliches: (1) einen qualifizierten Lehrer treffen; (2) authentisch praktizieren; (3) günstige Bedingungen sammeln. Dies sind die Vorräte, die für die Reise benötigt werden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 47,
    point: 7,
    en: {
      slogan: 'Cultivate the three that must not decline.',
      explanation:
        'Three qualities to maintain: devotion to the teacher, enthusiasm for practice, and careful keeping of precepts. Do not let any of these diminish.',
    },
    de: {
      slogan: 'Kultiviere die drei, die nicht abnehmen dürfen.',
      explanation:
        'Drei Qualitäten zu erhalten: Hingabe an den Lehrer, Begeisterung für die Praxis und sorgfältige Einhaltung der Gelübde. Lass keinen dieser Aspekte nachlassen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 48,
    point: 7,
    en: {
      slogan: 'Keep the three from which you must not separate.',
      explanation:
        'Ensure that body, speech, and mind never deviate from virtue. Keep these three in alignment with the practice at all times.',
    },
    de: {
      slogan: 'Halte die drei, die Du Dich nicht aufgeben darfst.',
      explanation:
        'Stelle sicher, dass Körper, Sprache und Geist niemals von der Tugend abweichen. Halte diese drei jederzeit im Einklang mit der Praxis.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 49,
    point: 7,
    en: {
      slogan: 'Apply the training impartially to all.',
      explanation:
        'Use the mind-training techniques equally toward all beings — friends, strangers, and enemies alike. There is no hierarchy in the objects of your compassion.',
    },
    de: {
      slogan: 'Wende das Training auf alle gleichermaßen an.',
      explanation:
        'Setze die Geistestrainingstechniken gleichermaßen gegenüber allen Wesen ein — Freunden, Fremden und Feinden gleichermaßen. Es gibt keine Hierarchie in den Objekten deines Mitgefühls.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 50,
    point: 7,
    en: {
      slogan: 'It is vital that it be deep and all-pervasive.',
      explanation:
        'The training must penetrate all aspects of life, not remain confined to formal meditation sessions. Deep means rooted in emptiness; all-pervasive means continuous.',
    },
    de: {
      slogan: 'Es ist entscheidend, dass es tiefgründig und alldurchdringend ist.',
      explanation:
        'Das Training muss alle Lebensbereiche durchdringen und darf nicht auf formelle Meditationssitzungen beschränkt bleiben. Tiefgründig bedeutet in der Leerheit verwurzelt; alldurchdringend bedeutet kontinuierlich.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 51,
    point: 7,
    en: {
      slogan: 'Meditate constantly on those who\'ve been set apart.',
      explanation:
        'Direct special meditation toward those you find most difficult — those you resent, fear, or exclude. These are precisely the beings who need your compassion most.',
    },
    de: {
      slogan: 'Meditiere stets auf diejenigen, die sich unterscheiden.',
      explanation:
        'Richte besondere Meditation auf diejenigen, die dir am schwierigsten fallen — auf die du grollst, fürchtest oder ausschließt. Diese Wesen brauchen dein Mitgefühl am meisten.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 52,
    point: 7,
    en: {
      slogan: 'Don\'t be dependent on external conditions.',
      explanation:
        'Integrate adversity into the path regardless of circumstances. Do not require ideal conditions to practice; transformation is possible in any situation.',
    },
    de: {
      slogan: 'Sei nicht abhängig von äußeren Bedingungen.',
      explanation:
        'Integriere Widrigkeiten in den Weg unabhängig von den Umständen. Verlange keine idealen Bedingungen zum Üben; Transformation ist in jeder Situation möglich.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 53,
    point: 7,
    en: {
      slogan: 'This time, practise what\'s most important.',
      explanation:
        'Do not postpone dharma practice. The opportunity of this human life is rare and precious; prioritize practice over worldly concerns now.',
    },
    de: {
      slogan: 'Praktiziere dieses Mal das, was am wichtigsten ist.',
      explanation:
        'Verschiebe die Dharma-Praxis nicht. Die Gelegenheit dieses menschlichen Lebens ist selten und kostbar; stelle die Praxis jetzt über weltliche Belange.',
    },
    attributionKey: 'notes',
  },
  {
    id: 54,
    point: 7,
    en: {
      slogan: 'Don\'t misunderstand.',
      explanation:
        'Avoid six forms of misunderstanding: misplaced patience (enduring hardship for worldly goals), misplaced intention, misplaced relish, misplaced compassion, misplaced pursuit, and misplaced joy.',
    },
    de: {
      slogan: 'Verstehe nicht falsch.',
      explanation:
        'Vermeide sechs Formen des Missverständnisses: unangemessene Geduld (Härten für weltliche Ziele ertragen), unangemessene Absicht, unangemessenes Wohlgefallen, unangemessenes Mitgefühl, unangemessenes Streben und unangemessene Freude.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 55,
    point: 7,
    en: {
      slogan: 'Don\'t be inconsistent.',
      explanation:
        'Train in mind training single-pointedly without interruption. Inconsistency — practicing intensely then abandoning it — prevents genuine progress.',
    },
    de: {
      slogan: 'Sei nicht inkonsequent.',
      explanation:
        'Trainiere das Geistestraining einspitzig ohne Unterbrechung. Inkonsequenz — intensiv üben und es dann aufgeben — verhindert echten Fortschritt.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 56,
    point: 7,
    en: {
      slogan: 'Train wholeheartedly.',
      explanation:
        'Devote yourself to the practice with complete commitment. Half-hearted effort yields half-hearted results; genuine transformation requires full engagement.',
    },
    de: {
      slogan: 'Übe von ganzem Herzen.',
      explanation:
        'Widme dich der Praxis mit vollem Engagement. Halbherzige Bemühung erzeugt halbherzige Ergebnisse; echte Transformation erfordert volles Engagement.',
    },
    attributionKey: 'root-text',
  },
  {
    id: 57,
    point: 7,
    en: {
      slogan: 'Gain freedom through discernment and analysis.',
      explanation:
        'Investigate your strongest afflictions with wisdom and apply targeted antidotes. Liberation comes through understanding, not through suppression.',
    },
    de: {
      slogan: 'Gewinne Freiheit durch Einsicht und Analyse.',
      explanation:
        'Untersuche deine stärksten Störgefühle mit Weisheit und wende gezielte Gegenmittel an. Befreiung kommt durch Verstehen, nicht durch Unterdrückung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 58,
    point: 7,
    en: {
      slogan: 'Don\'t be boastful.',
      explanation:
        'Avoid pride about your kindness toward others, how long you have practiced, or how much you have learned. Boasting contaminates the virtue it references.',
    },
    de: {
      slogan: 'Sei nicht prahlerisch.',
      explanation:
        'Vermeide Stolz auf deine Güte gegenüber anderen, wie lange du geübt hast oder wie viel du gelernt hast. Prahlen verunreinigt die Tugend, auf die es sich bezieht.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 59,
    point: 7,
    en: {
      slogan: 'Don\'t be irritable.',
      explanation:
        'When humiliated or insulted, do not retaliate even subtly. Absorb criticism and insult without reacting. This is the direct test of mind training.',
    },
    de: {
      slogan: 'Sei nicht reizbar.',
      explanation:
        'Wenn du gedemütigt oder beleidigt wirst, vergilt nicht, nicht einmal subtil. Nimm Kritik und Beleidigung auf, ohne zu reagieren. Dies ist der direkte Test des Geistestrainings.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 60,
    point: 7,
    en: {
      slogan: 'Don\'t be temperamental.',
      explanation:
        'Maintain consistent, steady emotional expression. Do not swing between warmth and coldness toward the same person based on how they treat you.',
    },
    de: {
      slogan: 'Sei nicht launisch.',
      explanation:
        'Behalte einen beständigen, gleichmäßigen emotionalen Ausdruck. Schwinge nicht zwischen Wärme und Kälte gegenüber derselben Person hin und her, basierend darauf, wie sie dich behandelt.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 61,
    point: 7,
    en: {
      slogan: 'Don\'t seek acknowledgement.',
      explanation:
        'Practice without expecting thanks, fame, or recognition. The moment you seek acknowledgement, the purity of the action is compromised.',
    },
    de: {
      slogan: 'Suche nicht nach Anerkennung.',
      explanation:
        'Übe ohne Dankbarkeit, Ruhm oder Anerkennung zu erwarten. In dem Moment, in dem du Anerkennung suchst, wird die Reinheit der Handlung beeinträchtigt.',
    },
    attributionKey: 'root-text',
  },
];

export const POINT_LABELS: Record<number, { en: string; de: string }> = {
  1: { en: 'The Preliminaries', de: 'Die Vorbereitenden Übungen' },
  2: { en: 'The Main Practice', de: 'Die Hauptpraxis' },
  3: { en: 'Transforming Adversity', de: 'Widrigkeiten Transformieren' },
  4: { en: 'Practice throughout Life', de: 'Praxis im ganzen Leben' },
  5: { en: 'The Measure of Mind Training', de: 'Das Ausmaß des Geistestrainings' },
  6: { en: 'The Commitments', de: 'Die Verpflichtungen' },
  7: { en: 'The Precepts', de: 'Die Gebote' },
};
