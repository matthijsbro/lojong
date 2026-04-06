// Slogans sourced literally from:
//   Root text: Geshe Chekawa Yeshe Dorje, trans. Adam Pearcey (EN), Juliane Wenzel (DE)
// Explanations:
//   English explanations quote directly from Gyalse Tokme Zangpo's
//   "Commentary on the Seven Points of Mind Training" (trans. Adam Pearcey).
//   German explanations are in-app translations based on that English commentary.
// All published by Lotsawa House under CC BY-NC 4.0.
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
  {
    id: 1,
    point: 1,
    en: {
      slogan: 'First, train in the preliminaries.',
      explanation:
        'This consists of three contemplations: i) on the difficulty of finding the freedoms and advantages; ii) on death and impermanence; and iii) on the trials of saṃsāra.',
    },
    de: {
      slogan: 'Übe als erstes die Vorbereitenden Übungen.',
      explanation:
        'Dies besteht aus drei Betrachtungen: i) über die Schwierigkeit, die Freiheiten und Vorzüge zu finden; ii) über Tod und Vergänglichkeit; und iii) über die Leiden des Saṃsāra.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 2,
    point: 2,
    en: {
      slogan: 'Consider all things and events as dreamlike.',
      explanation:
        'As this indicates, the whole environment and the beings within it, which we perceive as objects, are dreamlike. That is to say, they appear as they do because our own minds are deluded and not as a result of even the slightest factor aside from mind.',
    },
    de: {
      slogan: 'Betrachte alle Dinge und Begebenheiten als traumgleich.',
      explanation:
        'Wie dies andeutet, sind die ganze Umgebung und die Wesen darin, die wir als Objekte wahrnehmen, traumgleich. Das heißt: Sie erscheinen so, weil unsere eigenen Geister verblendet sind und nicht aufgrund auch nur des geringsten Faktors außerhalb des Geistes.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 3,
    point: 2,
    en: {
      slogan: 'Examine the nature of unborn awareness.',
      explanation:
        'Mind itself is empty of the three stages of arising, remaining and ceasing. It has no fixed character at all and cannot therefore be apprehended in any way.',
    },
    de: {
      slogan: 'Untersuche die Natur der ungeborenen Bewusstheit.',
      explanation:
        'Der Geist selbst ist leer von den drei Phasen des Entstehens, Verweilens und Vergehens. Er hat überhaupt keinen festen Charakter und kann daher in keiner Weise erfasst werden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 4,
    point: 2,
    en: {
      slogan: 'Let even the antidote be freed in its own place.',
      explanation:
        'This means that we look into the essence of the antidote itself, and when we realize that it has no true nature, we rest with that experience.',
    },
    de: {
      slogan: 'Lass selbst das Gegenmittel in sich selbst befreit sein.',
      explanation:
        'Das bedeutet, dass wir in die Essenz des Gegenmittels selbst schauen, und wenn wir erkennen, dass es keine wahre Natur hat, ruhen wir in dieser Erfahrung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 5,
    point: 2,
    en: {
      slogan: 'Rest in the ālaya, the essence.',
      explanation:
        'We must settle with lucid clarity in an experience that is beyond thought. We must not mentally fixate in any way on what has no fixed character at all.',
    },
    de: {
      slogan: 'Verweile in ālaya, der Essenz.',
      explanation:
        'Wir müssen uns mit leuchtender Klarheit in einer Erfahrung niederlassen, die jenseits des Denkens ist. Wir dürfen uns geistig in keiner Weise auf etwas fixieren, das überhaupt keinen festen Charakter hat.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 6,
    point: 2,
    en: {
      slogan: 'Between sessions, be a conjurer of illusions.',
      explanation:
        'We allow the experience of the meditation session to continue into the post-meditation. Whatever appears is just like an illusion and has no true reality.',
    },
    de: {
      slogan: 'Zwischen den Sitzungen sei ein Beschwörer der Illusionen.',
      explanation:
        'Wir lassen die Erfahrung der Meditationssitzung in die Zeit nach der Meditation hineinreichen. Was auch immer erscheint, ist wie eine Illusion und hat keine wahre Wirklichkeit.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 7,
    point: 2,
    en: {
      slogan: 'Train in the two—giving and taking—alternately.',
      explanation:
        'Take on and absorb all their suffering and give them your own body, possessions and virtuous deeds of the past, present and future. Consider that, as a result, they are happy and their virtue increases.',
    },
    de: {
      slogan: 'Übe die beiden - Geben und Nehmen- abwechselnd.',
      explanation:
        'Nimm all ihr Leiden in dich auf und gib ihnen deinen eigenen Körper, deine Besitztümer und tugendhaften Handlungen der Vergangenheit, Gegenwart und Zukunft. Betrachte, dass sie dadurch glücklich werden und ihre Tugend zunimmt.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 8,
    point: 2,
    en: {
      slogan: 'These two are to be mounted on the breath.',
      explanation:
        'As you breathe out, consider that all your own happiness and virtues goes to others. And as you breathe in, consider that all their non-virtue and suffering comes to you.',
    },
    de: {
      slogan: 'Diese beiden sollen mit dem Atem einhergehen.',
      explanation:
        'Während du ausatmest, betrachte, dass all dein eigenes Glück und deine Tugenden zu anderen gehen. Und während du einatmest, betrachte, dass all ihre Untugend und ihr Leiden zu dir kommt.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 9,
    point: 2,
    en: {
      slogan: 'Three objects, three poisons and three sources of virtue.',
      explanation:
        'On the basis of the three types of object—pleasant, unpleasant and neutral—we experience the three emotions of attachment, aversion and dull indifference. As a result, they gain the threefold virtue of being without attachment, aversion and dull indifference.',
    },
    de: {
      slogan: 'Drei Objekte, drei Gifte und drei Quellen der Tugend.',
      explanation:
        'Auf der Grundlage der drei Arten von Objekten — angenehm, unangenehm und neutral — erleben wir die drei Emotionen Anhaftung, Abneigung und dumpfe Gleichgültigkeit. Dadurch gewinnen sie die dreifache Tugend, frei von Anhaftung, Abneigung und dumpfer Gleichgültigkeit zu sein.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 10,
    point: 2,
    en: {
      slogan: 'In all activities, train by applying slogans.',
      explanation:
        'We should recite, "May all the negative actions and suffering of beings ripen on me! May all my happiness and virtue ripen on other beings!" And with this, we should feel intense resolve.',
    },
    de: {
      slogan: 'Übe bei allen Aktivitäten die Anwendung von Leitsätzen.',
      explanation:
        'Wir sollten rezitieren: "Mögen alle negativen Handlungen und das Leiden der Wesen auf mir reifen! Mögen all mein Glück und meine Tugend auf anderen Wesen reifen!" Und damit sollten wir starke Entschlossenheit empfinden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 11,
    point: 2,
    en: {
      slogan: 'Begin the process of taking with yourself.',
      explanation:
        'By first taking on our own future suffering in the present, we will become capable of taking on even the misery of others.',
    },
    de: {
      slogan: 'Beginne mit der Übung des Nehmens bei Dir selbst.',
      explanation:
        'Indem wir zuerst unser eigenes zukünftiges Leiden in der Gegenwart auf uns nehmen, werden wir fähig, sogar das Elend anderer auf uns zu nehmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 12,
    point: 3,
    en: {
      slogan: 'When all the world is filled with evil, transform adversity into the path of enlightenment.',
      explanation:
        'When many such forms of suffering arise, they can be transformed into the path of enlightenment through both intention and action.',
    },
    de: {
      slogan: 'Wenn die ganze Welt mit Leid erfüllt ist, transformiere Widrigkeiten in den Weg zu Erleuchtung.',
      explanation:
        'Wenn viele solche Formen des Leidens entstehen, können sie sowohl durch die Absicht als auch durch die Handlung in den Weg zur Erleuchtung verwandelt werden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 13,
    point: 3,
    en: {
      slogan: 'Drive all blames into one.',
      explanation:
        'Whatever suffering we experience is the fault of our own grasping at a self; others are not to blame.',
    },
    de: {
      slogan: 'Suche alle Schuld in einem.',
      explanation:
        'Welches Leiden wir auch erfahren, es ist die Schuld unseres eigenen Greifens nach einem Selbst; andere sind nicht daran schuld.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 14,
    point: 3,
    en: {
      slogan: 'Meditate on the great kindness of all.',
      explanation:
        'Generally speaking, all beings have been our kind parents in the course of beginningless time. We must therefore cultivate intense love and compassion for sentient beings.',
    },
    de: {
      slogan: 'Meditiere auf die große Güte aller.',
      explanation:
        'Allgemein gesprochen sind alle Wesen im Verlauf anfangsloser Zeit unsere gütigen Eltern gewesen. Deshalb müssen wir intensive Liebe und Mitgefühl für fühlende Wesen kultivieren.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 15,
    point: 3,
    en: {
      slogan: 'Meditating on delusory perceptions as the four kāyas is the unsurpassable śūnyatā protection.',
      explanation:
        'Whenever we experience mental afflictions or suffering caused by harm from the outer environment or beings within it, these afflictions and sufferings are delusory perceptions of our own mind. They thus lack even the slightest true existence.',
    },
    de: {
      slogan: 'Auf die trügerischen Wahrnehmungen als die vier kāyas zu meditieren ist der unübertreffliche śūnyatā Schutz.',
      explanation:
        'Wann immer wir geistige Affliktionen oder Leiden erfahren, die durch Schaden von der äußeren Umgebung oder den Wesen darin verursacht werden, sind diese Affliktionen und Leiden trügerische Wahrnehmungen unseres eigenen Geistes. Daher fehlt ihnen selbst die geringste wahre Existenz.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 16,
    point: 3,
    en: {
      slogan: 'The fourfold practice is the best of methods.',
      explanation:
        'The fourfold practice is the best of methods: 1. The Practice of Accumulating Merit. 2. The Practice of Purifying Negative Actions. 3. The Practice of Offering to Harmful Influences. 4. The Practice of Offering to the Dharma Protectors.',
    },
    de: {
      slogan: 'Die vierfache Praxis ist die beste Methode.',
      explanation:
        'Die vierfache Praxis ist die beste Methode: 1. die Praxis des Ansammelns von Verdienst. 2. die Praxis der Reinigung negativer Handlungen. 3. die Praxis des Darbringens an schädliche Einflüsse. 4. die Praxis des Darbringens an die Dharma-Beschützer.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 17,
    point: 3,
    en: {
      slogan: 'Whatever you encounter, apply the practice.',
      explanation:
        'Should you see someone in distress, immediately take their suffering upon yourself. And whenever you or another experience a strong mental affliction cultivate the heartfelt wish to take on the mental afflictions of others.',
    },
    de: {
      slogan: 'Was auch immer Dir begegnet, wende die Praxis an.',
      explanation:
        'Wenn du jemanden in Not siehst, nimm sein Leiden sofort auf dich. Und wann immer du oder jemand anderes eine starke geistige Affliktion erlebt, kultiviere den herzlichen Wunsch, die geistigen Affliktionen anderer auf dich zu nehmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 18,
    point: 4,
    en: {
      slogan: 'The essence of the instruction, briefly stated, is to apply yourself to the five strengths.',
      explanation:
        'The five strengths are as follows: 1. The strength of impetus. 2. The strength of familiarization. 3. The strength of wholesome seeds. 4. The strength of revulsion. 5. The strength of aspiration.',
    },
    de: {
      slogan: 'Die Essenz der Unterweisungen ist, kurz gesagt, die Anwendung der fünf Kräfte.',
      explanation:
        'Die fünf Kräfte sind die folgenden: 1. die Kraft des Antriebs. 2. die Kraft der Vertrautheit. 3. die Kraft heilsamer Samen. 4. die Kraft des Widerwillens. 5. die Kraft der Aspiration.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 19,
    point: 4,
    en: {
      slogan: 'The mahāyāna advice for transference involves the same five strengths. Conduct is important.',
      explanation:
        'The particular conduct is to lie on one\'s right side, with the right hand supporting the right cheek. Then, with love and compassion as a preliminary, train in giving and taking as you breathe in and out.',
    },
    de: {
      slogan: 'Der Mahāyāna Rat für die Übertragung umfasst dieselben fünf Kräfte. Verhalten ist wichtig.',
      explanation:
        'Das besondere Verhalten besteht darin, auf der rechten Seite zu liegen, wobei die rechte Hand die rechte Wange stützt. Dann übe, mit Liebe und Mitgefühl als Vorbereitung, beim Ein- und Ausatmen Geben und Nehmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 20,
    point: 5,
    en: {
      slogan: 'All teachings share a single purpose.',
      explanation:
        'The purpose of all the teachings of the greater and lesser vehicles is to tame self-grasping.',
    },
    de: {
      slogan: 'Alle Belehrungen haben das gleiche Ziel.',
      explanation:
        'Der Zweck aller Lehren der größeren und kleineren Fahrzeuge ist es, das Greifen nach dem Selbst zu zähmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 21,
    point: 5,
    en: {
      slogan: 'Of the two witnesses, rely upon the principal one.',
      explanation:
        'The principal witness, therefore, is an unembarassed look at one\'s own mind. To examine oneself thoroughly with an honest mind and have no cause to feel ashamed is a sign of having trained the mind.',
    },
    de: {
      slogan: 'Bei zwei Zeugen verlass Dich auf den Hauptzeugen.',
      explanation:
        'Der Hauptzeuge ist daher ein unbeschämter Blick auf den eigenen Geist. Sich mit einem ehrlichen Geist gründlich zu prüfen und keinen Grund zur Scham zu haben, ist ein Zeichen dafür, den Geist trainiert zu haben.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 22,
    point: 5,
    en: {
      slogan: 'Always maintain only a joyful attitude.',
      explanation:
        'Whatever negative circumstances arise, cultivate joy. And train yourself so that you have no hesitation in taking on the adversity of others as well.',
    },
    de: {
      slogan: 'Bewahre immer eine freudvolle Haltung.',
      explanation:
        'Welche negativen Umstände auch entstehen, kultiviere Freude. Und trainiere dich so, dass du keine Zögerlichkeit hast, auch die Widrigkeiten anderer auf dich zu nehmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 23,
    point: 5,
    en: {
      slogan: 'If this can be done even when distracted, you are proficient.',
      explanation:
        'A skilled rider will not fall from a horse even when distracted. Similarly, whenever adversity arises, transform the adversity into a support for mind training.',
    },
    de: {
      slogan: 'Wenn dies auch bei Ablenkung gehalten werden kann, bist Du erfahren.',
      explanation:
        'Ein geschickter Reiter wird selbst bei Ablenkung nicht vom Pferd fallen. Ebenso sollst du, wann immer Widrigkeit entsteht, die Widrigkeit in eine Unterstützung für das Geistestraining verwandeln.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 24,
    point: 6,
    en: {
      slogan: 'Train constantly in three basic principles.',
      explanation:
        'The three basic principles are 1) not to transgress the mind training commitments, 2) not to be reckless, and 3) not to fall into partiality.',
    },
    de: {
      slogan: 'Übe stets die drei grundlegenden Prinzipien.',
      explanation:
        'Die drei grundlegenden Prinzipien sind 1) die Verpflichtungen des Geistestrainings nicht zu übertreten, 2) nicht leichtsinnig zu sein und 3) nicht in Parteilichkeit zu verfallen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 25,
    point: 6,
    en: {
      slogan: 'Change your attitude, but remain natural.',
      explanation:
        'Transform your attitude from one of self-cherishing to one of cherishing others, while ensuring that your actions of body and speech are in harmony with those of our Dharma companions.',
    },
    de: {
      slogan: 'Ändere Deine Haltung, aber bleibe natürlich.',
      explanation:
        'Verwandle deine Haltung von Selbstbezogenheit in das Wertschätzen anderer, und sorge zugleich dafür, dass deine Handlungen von Körper und Sprache mit denen unserer Dharma-Gefährten im Einklang sind.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 26,
    point: 6,
    en: {
      slogan: 'Don’t speak of injured limbs.',
      explanation:
        'Do not say unpleasant things about others, whether this is pointing out disabilities such as blindness or spiritual flaws such as compromised ethical discipline.',
    },
    de: {
      slogan: 'Sprich nicht über verletzte Glieder.',
      explanation:
        'Sage nichts Unangenehmes über andere, sei es das Hinweisen auf Behinderungen wie Blindheit oder auf spirituelle Fehler wie geschwächte ethische Disziplin.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 27,
    point: 6,
    en: {
      slogan: 'Don’t ponder others’ flaws.',
      explanation:
        'Whenever you see faults in sentient beings in general or especially in those who have entered the door of the Dharma, attribute this to your own impure perception.',
    },
    de: {
      slogan: 'Beschäftige Dich nicht mit den Makeln anderer.',
      explanation:
        'Wann immer du Fehler in fühlenden Wesen im Allgemeinen oder besonders in jenen siehst, die durch das Tor des Dharma eingetreten sind, führe dies auf deine eigene unreine Wahrnehmung zurück.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 28,
    point: 6,
    en: {
      slogan: 'Train first with the strongest destructive emotions.',
      explanation:
        'Check to see which is the strongest destructive emotion in your mind and, combining all practices into an antidote to that emotion, address it first.',
    },
    de: {
      slogan: 'Übe zuerst mit den stärksten störenden Gefühlen.',
      explanation:
        'Prüfe, welches störende Gefühl in deinem Geist am stärksten ist, und richte es zuerst an, indem du alle Praktiken zu einem Gegenmittel gegen eben dieses Gefühl zusammenführst.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 29,
    point: 6,
    en: {
      slogan: 'Abandon any expectations of results.',
      explanation:
        'Let go of all selfish concerns, such as seeking to gain wealth and respect in this life, happiness in future lives as a god or human being, or gaining nirvāṇa for oneself, as a result of practising mind training.',
    },
    de: {
      slogan: 'Lass jegliche Erwartungen an Ergebnisse los.',
      explanation:
        'Lass alle selbstbezogenen Anliegen los, etwa in diesem Leben Wohlstand und Respekt zu gewinnen, in zukünftigen Leben als Gott oder Mensch Glück zu erlangen oder Nirvāṇa für dich selbst zu gewinnen, als Ergebnis der Praxis des Geistestrainings.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 30,
    point: 6,
    en: {
      slogan: 'Give up poisonous food.',
      explanation:
        'Abandon all virtuous activity that is contaminated by clinging to things as real or thoughts of self-cherishing, just as you would avoid food that is laced with poison.',
    },
    de: {
      slogan: 'Gib das vergiftete Essen auf.',
      explanation:
        'Lass jede tugendhafte Aktivität los, die durch das Festhalten an Dingen als wirklich oder durch Gedanken der Selbstbezogenheit verunreinigt ist, so wie du Nahrung meiden würdest, die mit Gift versetzt ist.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 31,
    point: 6,
    en: {
      slogan: 'Don’t be so loyal to the cause.',
      explanation:
        'Avoid holding grudges based on the harm others do to you and refusing to let go of resentment.',
    },
    de: {
      slogan: 'Sei nicht so loyal mit der Ursache.',
      explanation:
        'Vermeide es, Groll festzuhalten aufgrund des Schadens, den andere dir zufügen, und weigere dich nicht, Verbitterung loszulassen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 32,
    point: 6,
    en: {
      slogan: 'Don’t lash out in retaliation.',
      explanation:
        'When others speak ill of you, do not respond with harsh words intended to hurt. And do not label misfortune as a just reward.',
    },
    de: {
      slogan: 'Übe nicht Vergeltung.',
      explanation:
        'Wenn andere schlecht über dich sprechen, antworte nicht mit harten Worten, die verletzen sollen. Und bezeichne Unglück nicht als gerechte Vergeltung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 33,
    point: 6,
    en: {
      slogan: 'Don’t lie in ambush.',
      explanation:
        'Do not dwell on the harm others do to you while waiting for an opportunity to retaliate.',
    },
    de: {
      slogan: 'Liege nicht im Hinterhalt.',
      explanation:
        'Verweile nicht bei dem Schaden, den andere dir zufügen, während du auf eine Gelegenheit zur Vergeltung wartest.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 34,
    point: 6,
    en: {
      slogan: 'Don’t strike a vulnerable point.',
      explanation:
        'Do not act in a way that causes pain to the minds of others, such as by exposing people\'s hidden faults or reciting the "life-force mantras" of non-human beings.',
    },
    de: {
      slogan: 'Berühre nicht einen wunden Punkt.',
      explanation:
        'Handle nicht auf eine Weise, die den Geist anderer verletzt, etwa indem du verborgene Fehler von Menschen aufdeckst oder die "Lebenskraft-Mantras" nichtmenschlicher Wesen rezitierst.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 35,
    point: 6,
    en: {
      slogan: 'Don’t transfer the ox’s burden to the cow.',
      explanation:
        'Avoid the negative behaviour of deviously transferring to others any responsibility or blame that is rightly yours.',
    },
    de: {
      slogan: 'Bürde nicht die Last eines Ochsen einer Kuh auf.',
      explanation:
        'Vermeide das negative Verhalten, anderen auf hinterlistige Weise irgendeine Verantwortung oder Schuld zu übertragen, die eigentlich dir zusteht.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 36,
    point: 6,
    en: {
      slogan: 'Don’t be competitive.',
      explanation:
        'Avoid any thoughts and actions focused on acquiring through various means possessions that are held in common.',
    },
    de: {
      slogan: 'Wetteifere nicht mit anderen.',
      explanation:
        'Vermeide alle Gedanken und Handlungen, die darauf ausgerichtet sind, sich auf verschiedene Weise Besitztümer anzueignen, die gemeinsam gehalten werden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 37,
    point: 6,
    en: {
      slogan: 'Don’t misperform the rites.',
      explanation:
        'Mind training that involves a partial attitude and which is understood as a beneficial method for dealing with demons and harmful influences is no different from shamanic ritual. To qualify as Dharma it must function as an antidote to mental afflictions and ordinary thoughts.',
    },
    de: {
      slogan: 'Führe die Riten nicht falsch aus.',
      explanation:
        'Geistestraining, das eine partielle Haltung einschließt und als nützliche Methode gegen Dämonen und schädliche Einflüsse verstanden wird, ist nicht anders als schamanisches Ritual. Um als Dharma zu gelten, muss es als Gegenmittel gegen geistige Affliktionen und gewöhnliche Gedanken wirken.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 38,
    point: 6,
    en: {
      slogan: 'Don’t reduce gods to demons.',
      explanation:
        'If the practice of mind training leads to an increase in pride and arrogance, the Dharma has become non-Dharma. Mind training must discipline one\'s character.',
    },
    de: {
      slogan: 'Reduziere Götter nicht auf Dämonen.',
      explanation:
        'Wenn die Praxis des Geistestrainings zu einer Zunahme von Stolz und Arroganz führt, ist das Dharma zu Nicht-Dharma geworden. Geistestraining muss den eigenen Charakter disziplinieren.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 39,
    point: 6,
    en: {
      slogan: 'Don’t seek others’ misery as crutches of your own happiness.',
      explanation:
        'Avoid wishing that others suffer as a means to your own happiness.',
    },
    de: {
      slogan: 'Suche nicht das Elend anderer als Krücke für Dein eigenes Glück.',
      explanation:
        'Vermeide den Wunsch, dass andere leiden, als Mittel zu deinem eigenen Glück.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 40,
    point: 7,
    en: {
      slogan: 'Do everything with a single intention.',
      explanation:
        'Carry out all activities, such the yogas of eating and dressing, purely with the intention of benefitting others.',
    },
    de: {
      slogan: 'Tue alles mit einer einzigen Absicht.',
      explanation:
        'Führe alle Aktivitäten, etwa die Yogas des Essens und Ankleidens, rein mit der Absicht aus, anderen zu nützen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 41,
    point: 7,
    en: {
      slogan: 'Counter all adversity with a single remedy.',
      explanation:
        'If we feel compassion for them, we can aspire to take all their problems on ourselves and meditate on giving and taking (tonglen).',
    },
    de: {
      slogan: 'Begegne allen Widrigkeiten mit einem einzigen Gegenmittel.',
      explanation:
        'Wenn wir Mitgefühl für sie empfinden, können wir danach streben, all ihre Probleme auf uns zu nehmen und auf Geben und Nehmen (Tonglen) zu meditieren.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 42,
    point: 7,
    en: {
      slogan: 'Two tasks: one at the beginning and one at the end.',
      explanation:
        'In the morning create the right impetus by thinking, "Today I shall not part from twofold bodhicitta!" In the evening when preparing to sleep review the day\'s activities.',
    },
    de: {
      slogan: 'Zwei Aufgaben: Eine am Anfang und eine am Ende.',
      explanation:
        'Erschaffe am Morgen den richtigen Antrieb, indem du denkst: "Heute werde ich mich nicht von der zweifachen Bodhicitta trennen!" Prüfe am Abend, wenn du dich zum Schlafen bereit machst, die Handlungen des Tages.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 43,
    point: 7,
    en: {
      slogan: 'Whichever of the two occurs, be patient.',
      explanation:
        'Should you accumulate followers and a wealth of possessions, do not let them become a cause of arrogance. Should you become so destitute that you are lower than everything but water, recognize that this too is illusory.',
    },
    de: {
      slogan: 'Egal, was von den beiden erscheint, sei geduldig.',
      explanation:
        'Solltest du Anhänger und Reichtum an Besitztümern ansammeln, lass dies nicht zu einer Ursache von Arroganz werden. Solltest du so verarmt sein, dass du niedriger bist als alles außer Wasser, erkenne, dass auch dies illusorisch ist.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 44,
    point: 7,
    en: {
      slogan: 'Keep the two, even at your life’s expense.',
      explanation:
        'Unless you keep the commitments of the Dharma in general and mind training in particular you will not experience happiness in this or future lives. So guard them more dearly than your own life.',
    },
    de: {
      slogan: 'Halte die beiden, selbst unter Einsatz Deines Lebens.',
      explanation:
        'Wenn du die Verpflichtungen des Dharma im Allgemeinen und des Geistestrainings im Besonderen nicht bewahrst, wirst du in diesem oder künftigen Leben kein Glück erfahren. Hüte sie daher kostbarer als dein eigenes Leben.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 45,
    point: 7,
    en: {
      slogan: 'Train in the three difficulties.',
      explanation:
        'When mental afflictions arise, it is difficult to notice them in the beginning, difficult to avert them in the middle and difficult to interrupt their continuity in the end.',
    },
    de: {
      slogan: 'Übe Dich in den drei Schwierigkeiten.',
      explanation:
        'Wenn geistige Affliktionen entstehen, ist es schwierig, sie am Anfang zu bemerken, schwierig, sie in der Mitte abzuwenden, und schwierig, ihre Kontinuität am Ende zu unterbrechen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 46,
    point: 7,
    en: {
      slogan: 'Acquire the three main provisions.',
      explanation:
        'The most important provisions for Dharma practice are meeting a good teacher, practising authentically with a workable mind, and gathering the conditions conducive to Dharma practice.',
    },
    de: {
      slogan: 'Erstrebe die drei Vorbedingungen.',
      explanation:
        'Die wichtigsten Voraussetzungen für die Dharma-Praxis sind, einem guten Lehrer zu begegnen, authentisch mit einem brauchbaren Geist zu praktizieren und die Bedingungen zu sammeln, die der Dharma-Praxis förderlich sind.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 47,
    point: 7,
    en: {
      slogan: 'Cultivate the three that must not decline.',
      explanation:
        'Since all the qualities of the great vehicle depend on devotion to the guru, this devotion must not decline. Mind training is the quintessence of Mahāyāna Dharma, so enthusiasm for its practice must not decline.',
    },
    de: {
      slogan: 'Kultiviere die drei, die nicht abnehmen dürfen.',
      explanation:
        'Da alle Qualitäten des großen Fahrzeugs von Hingabe an den Guru abhängen, darf diese Hingabe nicht abnehmen. Geistestraining ist die Quintessenz des Mahāyāna-Dharma, daher darf die Begeisterung für seine Praxis nicht abnehmen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 48,
    point: 7,
    en: {
      slogan: 'Keep the three from which you must not separate.',
      explanation:
        'Ensure that your body, speech and mind never deviate from virtue.',
    },
    de: {
      slogan: 'Halte die drei, die Du Dich nicht aufgeben darfst.',
      explanation:
        'Sorge dafür, dass dein Körper, deine Sprache und dein Geist niemals von der Tugend abweichen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 49,
    point: 7,
    en: {
      slogan: 'Apply the training impartially to all.',
      explanation:
        'Mind training must be applied to all sentient beings and insentient objects equally and without partiality.',
    },
    de: {
      slogan: 'Wende das Training auf alle gleichermaßen an.',
      explanation:
        'Geistestraining muss auf alle fühlenden Wesen und unbelebten Objekte gleichermaßen und ohne Parteilichkeit angewendet werden.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 50,
    point: 7,
    en: {
      slogan: 'It is vital that it be deep and all-pervasive.',
      explanation:
        'You must apply the techniques to everything that arises in the mind. This should not be mere lip service but deep competence.',
    },
    de: {
      slogan: 'Es ist entscheidend, dass es tiefgründig und alldurchdringend ist.',
      explanation:
        'Du musst die Techniken auf alles anwenden, was im Geist entsteht. Das sollte nicht bloß Lippenbekenntnis sein, sondern tiefe Kompetenz.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 51,
    point: 7,
    en: {
      slogan: 'Meditate constantly on those who’ve been set apart.',
      explanation:
        'There are some for whom we find it difficult to feel love and compassion, and they should be the special focus of meditation: rivals, regular companions, those who harm us without provocation, and those who dislike us for karmic reasons.',
    },
    de: {
      slogan: 'Meditiere stets auf diejenigen, die sich unterscheiden.',
      explanation:
        'Es gibt einige, für die es uns schwerfällt, Liebe und Mitgefühl zu empfinden, und sie sollten der besondere Fokus der Meditation sein: Rivalen, vertraute Gefährten, jene, die uns ohne Provokation schaden, und jene, die uns aus karmischen Gründen nicht mögen.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 52,
    point: 7,
    en: {
      slogan: 'Don’t be dependent on external conditions.',
      explanation:
        'Do not rely on gathering all the right conditions, such as food and clothing, protection against human and non-human forces, good health and so on. If you cannot gather these conditions integrate that very situation onto the path by means of the two types of bodhicitta.',
    },
    de: {
      slogan: 'Sei nicht abhängig von äußeren Bedingungen.',
      explanation:
        'Verlass dich nicht darauf, alle richtigen Bedingungen zu sammeln, etwa Nahrung und Kleidung, Schutz vor menschlichen und nichtmenschlichen Kräften, gute Gesundheit und so weiter. Wenn du diese Bedingungen nicht sammeln kannst, integriere genau diese Situation durch die zwei Arten von Bodhicitta auf den Weg.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 53,
    point: 7,
    en: {
      slogan: 'This time, practise what’s most important.',
      explanation:
        'More important than the affairs of this life is the Dharma. More important than Dharma study and teaching is practice. More important than other forms of practice is training in bodhicitta.',
    },
    de: {
      slogan: 'Praktiziere dieses Mal das, was am wichtigsten ist.',
      explanation:
        'Wichtiger als die Angelegenheiten dieses Lebens ist das Dharma. Wichtiger als Dharma-Studium und Lehren ist Praxis. Wichtiger als andere Formen der Praxis ist das Training in Bodhicitta.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 54,
    point: 7,
    en: {
      slogan: 'Don’t misunderstand.',
      explanation:
        'There are six forms of misunderstanding to be avoided: misplaced patience, misplaced intention, misplaced relish, misplaced compassion, misplaced pursuit, and misplaced joy.',
    },
    de: {
      slogan: 'Verstehe nicht falsch.',
      explanation:
        'Es gibt sechs Formen des Missverstehens, die vermieden werden müssen: fehlgeleitete Geduld, fehlgeleitete Absicht, fehlgeleiteter Genuss, fehlgeleitetes Mitgefühl, fehlgeleitetes Streben und fehlgeleitete Freude.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 55,
    point: 7,
    en: {
      slogan: 'Don’t be inconsistent.',
      explanation:
        'Avoid the kind of sporadic practice that can occur when one does not yet have confidence in the Dharma. Train your mind single-pointedly and without interruption.',
    },
    de: {
      slogan: 'Sei nicht inkonsequent.',
      explanation:
        'Vermeide die Art von sporadischer Praxis, die auftreten kann, wenn man noch kein Vertrauen in das Dharma hat. Trainiere deinen Geist einspitzig und ohne Unterbrechung.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 56,
    point: 7,
    en: {
      slogan: 'Train wholeheartedly.',
      explanation:
        'Devote yourself entirely to the mind training and practise emphatically.',
    },
    de: {
      slogan: 'Übe von ganzem Herzen.',
      explanation:
        'Widme dich dem Geistestraining vollständig und praktiziere mit Nachdruck.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 57,
    point: 7,
    en: {
      slogan: 'Gain freedom through discernment and analysis.',
      explanation:
        'Determine which of your mental afflictions is the strongest and make that the focus of intensive effort. If it does arise, apply an antidote to overcome it, and make every effort until it no longer arises.',
    },
    de: {
      slogan: 'Gewinne Freiheit durch Einsicht und Analyse.',
      explanation:
        'Bestimme, welche deiner geistigen Affliktionen die stärkste ist, und mache sie zum Fokus intensiver Bemühung. Wenn sie tatsächlich entsteht, wende ein Gegenmittel an, um sie zu überwinden, und bemühe dich, bis sie nicht mehr entsteht.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 58,
    point: 7,
    en: {
      slogan: 'Don’t be boastful.',
      explanation:
        'Do not boast about how kind you are to others, how long you have strenuously practised the Dharma, or how learned and disciplined you are.',
    },
    de: {
      slogan: 'Sei nicht prahlerisch.',
      explanation:
        'Prahle nicht damit, wie gütig du zu anderen bist, wie lange du das Dharma angestrengt praktiziert hast oder wie gelehrt und diszipliniert du bist.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 59,
    point: 7,
    en: {
      slogan: 'Don’t be irritable.',
      explanation:
        'Do not retaliate even if others humiliate you in front of many people and do not be annoyed. Ensure that Dharma functions properly as an antidote to self-grasping.',
    },
    de: {
      slogan: 'Sei nicht reizbar.',
      explanation:
        'Übe keine Vergeltung, selbst wenn andere dich vor vielen Menschen demütigen, und sei nicht verärgert. Sorge dafür, dass das Dharma richtig als Gegenmittel gegen das Greifen nach dem Selbst wirkt.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 60,
    point: 7,
    en: {
      slogan: 'Don’t be temperamental.',
      explanation:
        'Do not change your expression from cheery to depressed at the slightest provocation, because this will only upset your companions.',
    },
    de: {
      slogan: 'Sei nicht launisch.',
      explanation:
        'Verändere deinen Ausdruck nicht schon bei der geringsten Provokation von heiter zu niedergeschlagen, denn das wird nur deine Gefährten verstören.',
    },
    attributionKey: 'commentary',
  },
  {
    id: 61,
    point: 7,
    en: {
      slogan: 'Don’t seek acknowledgement.',
      explanation:
        'Do not expect words of thanks or fame and renown for benefitting others or practising the Dharma.',
    },
    de: {
      slogan: 'Suche nicht nach Anerkennung.',
      explanation:
        'Erwarte weder Worte des Dankes noch Ruhm und Ansehen dafür, anderen zu nützen oder das Dharma zu praktizieren.',
    },
    attributionKey: 'commentary',
  },
];

export const POINT_LABELS: Record<number, { en: string; de: string }> = {
  1: { en: 'The Preliminaries', de: 'Die Vorbereitenden Übungen' },
  2: { en: 'The Main Practice', de: 'Die Hauptpraxis' },
  3: {
    en: 'Transforming Adversity into the Path of Enlightenment',
    de: 'Widrigkeiten in den Weg zur Erleuchtung transformieren',
  },
  4: {
    en: 'Applying the Practice throughout the Whole of Life',
    de: 'Die Praxis im ganzen Leben anwenden',
  },
  5: { en: 'The Measure of Mind Training', de: 'Das Ausmaß des Geistestrainings' },
  6: { en: 'The Commitments of Mind Training', de: 'Die Verpflichtungen des Geistestrainings' },
  7: { en: 'The Precepts of Mind Training', de: 'Die Gebote des Geistestrainings' },
};