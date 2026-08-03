// Slogans sourced literally from:
//   Root text: Geshe Chekawa Yeshe Dorje, trans. Adam Pearcey (EN), Juliane Wenzel (DE)
// Explanations:
//   Each explanation holds the full section of Gyalse Tokme Zangpo's
//   "Commentary on the Seven Points of Mind Training" (trans. Adam Pearcey)
//   that discusses the slogan. German explanations are in-app translations
//   based on that English commentary.
// All published by Lotsawa House under CC BY-NC 4.0.
//
// This file is hand-edited and is the single source of truth for content.
// Strings use backticks (`...`): they span multiple lines and may contain
// apostrophes and quotes freely. Keep content lines flush with the left
// margin — leading indentation would become part of the text.
// Explanations are markdown: blank line = new paragraph, single newline =
// verse line break (keep prose paragraphs on one long line and let the
// editor soft-wrap); supports # ## ### headings, - bullets, 1. numbered
// lists, **bold**, *italic* and > blockquotes (rendered by
// src/components/Markdown.tsx).
//
// To edit content: modify the entries below.
// To add a slogan: append an entry with a unique id and matching attributionKey.
// To add a language: add a new locale block alongside 'en' and 'de'.

export type SloganLocale = {
  slogan: string;
  // Markdown, see the header comment for the supported syntax.
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
      slogan: `First, train in the preliminaries.`,
      explanation: `# 1. The Preliminaries
The root text says:
> First, train in the preliminaries.

This consists of three contemplations: i) on the difficulty of finding the freedoms and advantages; ii) on death and impermanence; and iii) on the trials of saṃsāra.

## i. The Freedoms and Advantages
For the first, we contemplate the following: to obtain this support for practising the Dharma, a human body with its freedoms and advantages, we must have accumulated the cause, which is abundant virtue. Among sentient beings, very few practice pure virtuous action, and this means that the resultant freedoms and advantages are difficult to gain. If we consider other beings, such as animals, we can appreciate just how rare it is to find the freedoms and advantages. Therefore, now that we have found these freedoms and advantages, we must not allow them to go to waste, but use them to practise the one pure Dharma.

## ii. Death and Impermanence
Meditate on how life is uncertain and there are many circumstances which can lead to death, so that we cannot be certain we will even survive the day. We must therefore put all our energy into the sacred Dharma right away.

## iii. The Trials of Saṃsāra
Consider how it is taught that virtuous and unwholesome actions result in pleasure and pain, and how we must therefore avoid all unwholesome actions and practise virtue as much as possible.`,
    },
    de: {
      slogan: `Übe als erstes die Vorbereitenden Übungen.`,
      explanation: `# 1. Die Vorbereitenden Übungen
Der Wurzeltext sagt:
> Übe als erstes die Vorbereitenden Übungen.

Dies besteht aus drei Betrachtungen: i) über die Schwierigkeit, die Freiheiten und Vorzüge zu finden; ii) über Tod und Vergänglichkeit; und iii) über die Leiden des Saṃsāra.

## i. Die Freiheiten und Vorzüge
Für die erste betrachten wir Folgendes: Um diese Grundlage für die Praxis des Dharma zu erlangen — einen menschlichen Körper mit seinen Freiheiten und Vorzügen —, müssen wir die Ursache angesammelt haben, nämlich reichliche Tugend. Unter den fühlenden Wesen praktizieren nur sehr wenige reine tugendhafte Handlungen, und das bedeutet, dass die daraus hervorgehenden Freiheiten und Vorzüge schwer zu erlangen sind. Wenn wir andere Wesen betrachten, etwa Tiere, können wir ermessen, wie selten es ist, die Freiheiten und Vorzüge zu finden. Da wir diese Freiheiten und Vorzüge nun gefunden haben, dürfen wir sie daher nicht ungenutzt verstreichen lassen, sondern müssen sie nutzen, um das eine reine Dharma zu praktizieren.

## ii. Tod und Vergänglichkeit
Meditiere darüber, wie ungewiss das Leben ist und wie viele Umstände zum Tod führen können, sodass wir nicht einmal sicher sein können, den heutigen Tag zu überleben. Wir müssen daher unsere ganze Kraft sofort in das heilige Dharma legen.

## iii. Die Leiden des Saṃsāra
Betrachte, wie gelehrt wird, dass tugendhafte und unheilsame Handlungen zu Freude und Schmerz führen, und wie wir daher alle unheilsamen Handlungen vermeiden und so viel wie möglich Tugend üben müssen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 2,
    point: 2,
    en: {
      slogan: `Consider all things and events as dreamlike.`,
      explanation: `# 2. The Main Practice
Training in bodhicitta has two parts: i) training in ultimate bodhicitta and ii) training in relative bodhicitta.
##  i. Ultimate Bodhicitta
This consists of three sets of practices: the preparation, the main part and the
conclusion.

As the preparation, take refuge and generate bodhicitta, then pray to the deity and the guru and offer the seven branches. Sit up straight and breathe in and out twenty-one times, without any confusion, omission or addition. This will help to make you a suitable vessel for meditative concentration.

For the main part, the root text says:
> Consider all dharmas as dreamlike.

As this indicates, the whole environment and the beings within it, which we perceive as objects, are dreamlike. That is to say, they appear as they do because our own minds are deluded and not as a result of even the slightest factor aside from mind. We must therefore put a stop to our projections.`,
    },
    de: {
      slogan: `Betrachte alle Dinge und Begebenheiten als traumgleich.`,
      explanation: `# 2. Die Hauptpraxis
Das Training in Bodhicitta hat zwei Teile: i) das Training in letztendlichem Bodhicitta und ii) das Training in relativem Bodhicitta.
## i. Letztendliches Bodhicitta
Dieses besteht aus drei Gruppen von Übungen: der Vorbereitung, dem Hauptteil und dem Abschluss.

Als Vorbereitung nimm Zuflucht und erwecke Bodhicitta, dann bete zur Gottheit und zum Guru und bringe die sieben Zweige dar. Sitze aufrecht und atme einundzwanzigmal ein und aus, ohne Verwirrung, Auslassung oder Hinzufügung. Dies hilft dir, ein geeignetes Gefäß für meditative Konzentration zu werden.

Für den Hauptteil sagt der Wurzeltext:
> Betrachte alle Dharmas als traumgleich.

Wie dies andeutet, sind die ganze Umgebung und die Wesen darin, die wir als Objekte wahrnehmen, traumgleich. Das heißt: Sie erscheinen so, weil unsere eigenen Geister verblendet sind und nicht aufgrund auch nur des geringsten Faktors außerhalb des Geistes. Wir müssen daher unseren Projektionen ein Ende setzen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 3,
    point: 2,
    en: {
      slogan: `Examine the nature of unborn awareness.`,
      explanation: `We might then wonder whether the mind itself is real, so the root text says:
>Examine the nature of unborn awareness.        

Mind itself is empty of the three stages of arising, remaining and ceasing. It has no colour, no shape, and so on. It does not abide outside or within the body. It has no fixed character at all and cannot therefore be apprehended in any way. Rest in an experience beyond thought.`,
    },
    de: {
      slogan: `Untersuche die Natur der ungeborenen Bewusstheit.`,
      explanation: `Man könnte sich dann fragen, ob der Geist selbst wirklich ist, daher sagt der Wurzeltext:
> Untersuche die Natur der ungeborenen Bewusstheit.

Der Geist selbst ist leer von den drei Phasen des Entstehens, Verweilens und Vergehens. Er hat keine Farbe, keine Form und so weiter. Er verweilt weder außerhalb noch innerhalb des Körpers. Er hat überhaupt keinen festen Charakter und kann daher in keiner Weise erfasst werden.

Ruhe in einer Erfahrung jenseits des Denkens.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 4,
    point: 2,
    en: {
      slogan: `Let even the antidote be freed in its own place.`,
      explanation: `As you do so, if any thought of an antidote, such as
considering that body and mind are empty should arise, then as the root text says:
> Let even the antidote be freed in their own place.

This means that we look into the essence of the antidote itself, and when we realize that it has no true nature, we rest with that experience.`,
    },
    de: {
      slogan: `Lass selbst das Gegenmittel in sich selbst befreit sein.`,
      explanation: `Sollte dabei irgendein Gedanke an ein Gegenmittel entstehen, etwa die Betrachtung dass Körper und Geist leer sind, dann sagt der Wurzeltext:
> Lass selbst das Gegenmittel an ihrem eigenen Ort befreit sein.

Das bedeutet, dass wir in die Essenz des Gegenmittels selbst schauen, und wenn wir erkennen, dass es keine wahre Natur hat, ruhen wir in dieser Erfahrung.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 5,
    point: 2,
    en: {
      slogan: `Rest in the ālaya, the essence.`,
      explanation: `As for how to rest, the root text says:
>Rest in the *ālaya*, the essence.

Avoiding all the projection and absorption associated with the other seven types of consciousness, we must settle with lucid clarity in an experience that is beyond thought. We must not mentally fixate in any way on what has no fixed character at all.`,
    },
    de: {
      slogan: `Verweile in ālaya, der Essenz.`,
      explanation: `Was das Verweilen betrifft, sagt der Wurzeltext:
> Verweile in *ālaya*, der Essenz.

Indem wir alle Projektion und Absorption vermeiden, die mit den anderen sieben Arten des Bewusstseins verbunden sind, müssen wir uns mit leuchtender Klarheit in einer Erfahrung niederlassen, die jenseits des Denkens ist. Wir dürfen uns geistig in keiner Weise auf etwas fixieren, das überhaupt keinen festen Charakter hat.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 6,
    point: 2,
    en: {
      slogan: `Between sessions, be a conjurer of illusions.`,
      explanation: `As regards the conclusion, the root text says:
> Between sessions, be a conjurer of illusions.

In other words, we allow the experience of the meditation session to continue into the post-meditation.We carry out all ordinary daily activities in the knowledge that whatever appears—ourselves and others, the environment and beings—is just like an illusion and has no true reality.`,
    },
    de: {
      slogan: `Zwischen den Sitzungen sei ein Beschwörer der Illusionen.`,
      explanation: `Was den Abschluss betrifft, sagt der Wurzeltext:
> Zwischen den Sitzungen sei ein Beschwörer der Illusionen.

Mit anderen Worten: Wir lassen die Erfahrung der Meditationssitzung in die Zeit nach der Meditation hineinreichen. Wir gehen allen gewöhnlichen täglichen Aktivitäten in dem Wissen nach, dass alles, was erscheint — wir selbst und andere, die Umgebung und die Wesen —, wie eine Illusion ist und keine wahre Wirklichkeit hat.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 7,
    point: 2,
    en: {
      slogan: `Train in the two—giving and taking—alternately.`,
      explanation: `## ii. Relative Bodhicitta
This has two parts: meditation and post-meditation. Regarding the meditation, the root text says:
> Train in the two—giving and taking—alternately.

This is extremely important. As Ācārya Śāntideva said:
> Whoever wishes to afford protection 
> Quickly to both himself and others
> Should practise that most sacred mystery:
> The exchanging of oneself for others.(2)

And:
> Unless I can give away my happiness
> In exchange for others' suffering.
> I shall not attain the awakening I seek,
> And even in saṃsāra I'll find no joy.(3)
 
And:
> In order to allay harms done to me, therefore,
> And in order to pacify the sufferings of others,
> I shall give myself up to others
> And cherish them as I do myself.(4)
 
We begin by focusing clearly on our own mother from this life. From the time she carried us inside her womb, she cared for us unfailingly, so that we could encounter the Buddha's teachings and put them into practice. Her kindness is therefore exceedingly great. Not only in this life, but throughout beginningless time in saṃsāra, she has looked upon us with eyes of love, thought of us with affection, shielded us from harm, brought us benefit and ensured our well-being. Thus, her kindness is very great indeed. Considering that the one who did all this for us is now undergoing various miseries in saṃsāra, cultivate intense compassion. Think: "Now I shall benefit her in return! I shall eliminate all that harms her!"

What is it that harms her? It is suffering and its origin. Suffering harms her directly, while its origin harms her indirectly. So consider that you take both upon yourself. Take on all the suffering and its origin that exists in her being so that it arises in your own heart. Cultivate a strong wish for this to happen.

What is it that would benefit your mother? Happiness and virtue. So, without any selfish concerns, give away all your own happiness and virtue to your mother. Consider that as a result she immediately amasses all the favourable circumstances required for Dharma practice and is capable of attaining awakening. Generate an intense longing for this to occur.

Meditate in the same way while considering your father and others, before ultimately extending the practice to all sentient beings. After all, these sentient beings have been your mother and father throughout the course of beginningless time. They have benefitted you immeasurably and been incredibly kind. Yet all those who showed you such kindness are now being tormented by various sufferings in saṃsāra. Meditate, therefore, on how wonderful it would be if they could be freed from their misery. Take on and absorb all their suffering and give them your own body, possessions and virtuous deeds of the past, present and future. Consider that, as a result, they are happy and their virtue increases. Generate intense longing that this may happen.`,
    },
    de: {
      slogan: `Übe die beiden - Geben und Nehmen- abwechselnd.`,
      explanation: `## ii. Relatives Bodhicitta
Dies hat zwei Teile: Meditation und Nach-Meditation. Was die Meditation betrifft, sagt der Wurzeltext:
> Übe die beiden - Geben und Nehmen- abwechselnd.

Dies ist äußerst wichtig. Wie Ācārya Śāntideva sagte:
> Wer sich selbst und anderen
> rasch Schutz gewähren will,
> der übe jenes heiligste Geheimnis:
> das Vertauschen von sich selbst mit anderen.(2)

Und:
> Wenn ich mein Glück nicht fortgeben kann
> im Tausch gegen das Leiden anderer,
> werde ich das Erwachen, das ich suche, nicht erlangen,
> und selbst im Saṃsāra werde ich keine Freude finden.(3)

Und:
> Um daher das Leid zu lindern, das mir zugefügt wird,
> und um die Leiden anderer zu befrieden,
> gebe ich mich selbst den anderen hin
> und halte sie so wert wie mich selbst.(4)

Wir beginnen damit, uns klar auf unsere eigene Mutter aus diesem Leben zu konzentrieren. Von der Zeit an, als sie uns in ihrem Leib trug, sorgte sie unablässig für uns, sodass wir den Lehren des Buddha begegnen und sie in die Praxis umsetzen konnten. Ihre Güte ist daher überaus groß. Nicht nur in diesem Leben, sondern durch anfangslose Zeit im Saṃsāra hat sie uns mit Augen der Liebe betrachtet, mit Zuneigung an uns gedacht, uns vor Schaden beschützt, uns Nutzen gebracht und für unser Wohlergehen gesorgt. So ist ihre Güte in der Tat sehr groß. Bedenke, dass diejenige, die all dies für uns getan hat, nun verschiedene Leiden im Saṃsāra durchlebt, und kultiviere intensives Mitgefühl. Denke: „Nun werde ich ihr im Gegenzug nützen! Ich werde alles beseitigen, was ihr schadet!"

Was ist es, das ihr schadet? Es sind das Leiden und sein Ursprung. Das Leiden schadet ihr unmittelbar, sein Ursprung mittelbar. Betrachte also, dass du beides auf dich nimmst. Nimm alles Leiden und seinen Ursprung, die in ihrem Wesen existieren, auf dich, sodass sie in deinem eigenen Herzen entstehen. Kultiviere den starken Wunsch, dass dies geschehen möge.

Was ist es, das deiner Mutter nützen würde? Glück und Tugend. Gib also ohne jede selbstbezogene Sorge all dein eigenes Glück und deine Tugend an deine Mutter fort. Betrachte, dass sie dadurch sogleich alle günstigen Umstände ansammelt, die für die Dharma-Praxis erforderlich sind, und fähig ist, das Erwachen zu erlangen. Erwecke ein intensives Sehnen danach, dass dies eintreten möge.

Meditiere auf dieselbe Weise, während du deinen Vater und andere betrachtest, bevor du die Praxis schließlich auf alle fühlenden Wesen ausdehnst. Schließlich sind diese fühlenden Wesen im Verlauf anfangsloser Zeit unsere Mutter und unser Vater gewesen. Sie haben uns unermesslich genützt und waren unglaublich gütig. Doch alle, die uns solche Güte erwiesen haben, werden nun von verschiedenen Leiden im Saṃsāra gequält. Meditiere daher darüber, wie wunderbar es wäre, wenn sie von ihrem Elend befreit werden könnten. Nimm all ihr Leiden in dich auf und gib ihnen deinen eigenen Körper, deine Besitztümer und tugendhaften Handlungen der Vergangenheit, Gegenwart und Zukunft. Betrachte, dass sie dadurch glücklich werden und ihre Tugend zunimmt. Erwecke ein intensives Sehnen danach, dass dies geschehen möge.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 8,
    point: 2,
    en: {
      slogan: `These two are to be mounted on the breath.`,
      explanation: `
So that this mental exchange of self and other might arise more easily, the root text says:
> These two are to be mounted on the breath.

As you breathe out, consider that all your own happiness and virtues goes to others.
And as you breathe in, consider that all their non-virtue and suffering comes to you.`,
    },
    de: {
      slogan: `Diese beiden sollen mit dem Atem einhergehen.`,
      explanation: `Damit dieser geistige Austausch von sich selbst und anderen leichter entstehen kann, sagt der Wurzeltext:
> Diese beiden sollen mit dem Atem einhergehen.

Während du ausatmest, betrachte, dass all dein eigenes Glück und deine Tugenden zu anderen gehen.
Und während du einatmest, betrachte, dass all ihre Untugend und ihr Leiden zu dir kommt.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 9,
    point: 2,
    en: {
      slogan: `Three objects, three poisons and three sources of virtue.`,
      explanation: `
Second, concerning the post-meditation, the root text says:
> Three objects, three poisons and three sources of virtue.

On the basis of the three types of object—pleasant, unpleasant and neutral—we experience the three emotions of attachment, aversion and dull indifference. There are many beings who experience these three poisons based on the three types of object, so here we consider that we take on all their three poisons. As a result, they gain the threefold virtue of being without attachment, aversion and dull indifference.`,
    },
    de: {
      slogan: `Drei Objekte, drei Gifte und drei Quellen der Tugend.`,
      explanation: `Zweitens, was die Nach-Meditation betrifft, sagt der Wurzeltext:
> Drei Objekte, drei Gifte und drei Quellen der Tugend.

Auf der Grundlage der drei Arten von Objekten — angenehm, unangenehm und neutral — erleben wir die drei Emotionen Anhaftung, Abneigung und dumpfe Gleichgültigkeit. Es gibt viele Wesen, die diese drei Gifte auf der Grundlage der drei Arten von Objekten erleben; daher betrachten wir hier, dass wir alle ihre drei Gifte auf uns nehmen. Dadurch gewinnen sie die dreifache Tugend, frei von Anhaftung, Abneigung und dumpfer Gleichgültigkeit zu sein.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 10,
    point: 2,
    en: {
      slogan: `In all activities, train by applying slogans.`,
      explanation: `
The root text advises how to inspire mindfulness:
> In all activities, train by applying slogans.

This means that we should recite, "May all the negative actions and suffering of
beings ripen on me! May all my happiness and virtue ripen on other beings!" And
with this, we should feel intense resolve.`,
    },
    de: {
      slogan: `Übe bei allen Aktivitäten die Anwendung von Leitsätzen.`,
      explanation: `Der Wurzeltext rät, wie man Achtsamkeit anregen kann:
> Übe bei allen Aktivitäten die Anwendung von Leitsätzen.

Das bedeutet, dass wir rezitieren sollten: „Mögen alle negativen Handlungen und das Leiden der Wesen auf mir reifen! Mögen all mein Glück und meine Tugend auf anderen Wesen reifen!" Und damit sollten wir starke Entschlossenheit empfinden.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 11,
    point: 2,
    en: {
      slogan: `Begin the process of taking with yourself.`,
      explanation: `
So that we might be able to take others' sufferings upon ourselves, the root text says:
> Begin the process of taking with yourself.
 
This means that by first taking on our own future suffering in the present, we will
become capable of taking on even the misery of others.`,
    },
    de: {
      slogan: `Beginne mit der Übung des Nehmens bei Dir selbst.`,
      explanation: `Damit wir fähig werden, das Leiden anderer auf uns zu nehmen, sagt der Wurzeltext:
> Beginne mit der Übung des Nehmens bei Dir selbst.

Das bedeutet: Indem wir zuerst unser eigenes zukünftiges Leiden in der Gegenwart auf uns nehmen, werden wir fähig, sogar das Elend anderer auf uns zu nehmen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 12,
    point: 3,
    en: {
      slogan: `When all the world is filled with evil, transform adversity into the path of enlightenment.`,
      explanation: `
# 3. Transforming Adversity into the Path of Enlightenment
The root text says:
> When all the world is filled with evil, 
> Transform adversity into the path of enlightenment.

As a result of unwholesome actions, the environment's resources become depleted, beings become unruly and so on. When many such forms of suffering arise, they can be transformed into the path of  enlightenment through both intention and action.

## i. Intention
Intention itself has two aspects: transforming adversity into the path of enlightenment through relative bodhicitta and through ultimate bodhicitta.`,
    },
    de: {
      slogan: `Wenn die ganze Welt mit Leid erfüllt ist, transformiere Widrigkeiten in den Weg zu Erleuchtung.`,
      explanation: `# 3. Widrigkeiten in den Weg zur Erleuchtung transformieren
Der Wurzeltext sagt:
> Wenn die ganze Welt mit Leid erfüllt ist,
> transformiere Widrigkeiten in den Weg zu Erleuchtung.

Infolge unheilsamer Handlungen erschöpfen sich die Ressourcen der Umwelt, die Wesen werden zügellos und so weiter. Wenn viele solche Formen des Leidens entstehen, können sie sowohl durch die Absicht als auch durch die Handlung in den Weg zur Erleuchtung verwandelt werden.

## i. Absicht
Die Absicht selbst hat zwei Aspekte: Widrigkeiten durch relatives Bodhicitta und durch letztendliches Bodhicitta in den Weg zur Erleuchtung zu transformieren.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 13,
    point: 3,
    en: {
      slogan: `Drive all blames into one.`,
      explanation: `
**Transforming Adversity into the Path of Enlightenment through Relative Bodhicitta**
In the past when we experienced suffering we did not recognize self-grasping as the enemy, and, failing to recognize the great kindness of sentient beings, we blamed them. Now in order to highlight the fact that all suffering is the fault of self-grasping, the root text says:
> Drive all blames into one.

Whatever suffering we experience is the fault of our own grasping at a self; others are not to blame:
> If all the harm within the world
> And all the fears and sufferings
> Derive only from clinging to a self,
> What need have I for such a demon?(5)
 
Throughout beginningless time we have clung to a self where there is none. And, in order to care for this self, we have accumulated the karma of harming others and so on. This is how the sufferings of saṃsāra, such as those of the lower realms, arise. *Introduction to the Bodhisattva's Way of Life* says:
> O mind, you have spent countless ages
> Pursuing your own interests,
> And yet this great exertion
> Has brought you only suffering.(6)
 
Since it is self-grasping that brings about suffering, we must view this self-grasping as the enemy. The mind that clings to a self where there is none has engendered all the suffering that we have experienced in saṃsāra throughout beginningless time until now. It is this that causes all our attitudes of jealousy towards superiors, contempt towards inferiors and rivalry towards equals. It is this that prevents us from becoming liberated from saṃsāra and that brings about all the suffering of harm from human and non-human interaction. As *Introduction to the Bodhisattva's Way of Life* says:
> This is the one who, hundreds of times
> In cyclic existence, has done me harm.
> Now, remembering these grievances,
> I shall crush your selfish attitude.(7)

Whenever self-grasping occurs, examination will show that there is no self at all. By questioning why we cling to such a self, we can abandon self-grasping just as it arises. Strive then to prevent this grasping of self-cherishing from occurring again in future. As *Introduction to the Bodhisattva's Way of Life* says:
> The time when you could harm me
> Has passed and is here no more.
> I see you now! Where will you hide?
> I'll crush you in all your arrogance.(8)
  
Thus, since whatever harms we face are the fault of this demon of self-grasping, we must do whatever we can to tame it. As Shawopa said: "Today, in this short life, subjugate this demon, I beg you."

Someone whose intentions and actions are directed towards securing their own well-being warrants the name of 'layperson'; while someone whose intentions and actions are directed towards the benefit of others is worthy of the name of a Dharma practitioner. Let us therefore avoid and adopt according to Geshe Ben's tradition. For it was Geshe Ben who said, "Now I shall hold the spear of the antidote at the gateway of the mind. If it is vigilant, I shall be vigilant too. If it is relaxed, I shall relax as well." 
 
Viewing self-grasping as the enemy and avoiding it is what Shawopa called "the Dharma of exorcising the demon."(9)`,
    },
    de: {
      slogan: `Suche alle Schuld in einem.`,
      explanation: `
**Widrigkeiten durch relatives Bodhicitta in den Weg zur Erleuchtung transformieren**
Wenn wir in der Vergangenheit Leiden erlebten, erkannten wir das Greifen nach dem Selbst nicht als den Feind, und da wir die große Güte der fühlenden Wesen nicht erkannten, gaben wir ihnen die Schuld. Um nun hervorzuheben, dass alles Leiden die Schuld des Greifens nach dem Selbst ist, sagt der Wurzeltext:
> Suche alle Schuld in einem.

Welches Leiden wir auch erfahren, es ist die Schuld unseres eigenen Greifens nach einem Selbst; andere sind nicht daran schuld:
> Wenn alles Leid in der Welt
> und alle Ängste und Leiden
> allein aus dem Festhalten an einem Selbst entstehen —
> wozu brauche ich dann solch einen Dämon?(5)

Durch anfangslose Zeit hindurch haben wir an einem Selbst festgehalten, wo keines ist. Und um für dieses Selbst zu sorgen, haben wir das Karma angesammelt, anderen zu schaden, und so weiter. So entstehen die Leiden des Saṃsāra, etwa jene der niederen Bereiche. In der *Einführung in den Lebensweg des Bodhisattva* heißt es:
> O Geist, du hast zahllose Zeitalter damit verbracht,
> deinen eigenen Interessen nachzujagen,
> und doch hat dir diese große Anstrengung
> nichts als Leiden gebracht.(6)

Da es das Greifen nach dem Selbst ist, das Leiden hervorbringt, müssen wir dieses Greifen nach dem Selbst als den Feind betrachten. Der Geist, der an einem Selbst festhält, wo keines ist, hat alles Leiden hervorgebracht, das wir im Saṃsāra durch anfangslose Zeit bis heute erfahren haben. Er ist es, der all unsere Haltungen der Eifersucht gegenüber Höhergestellten, der Verachtung gegenüber Niedrigergestellten und der Rivalität gegenüber Gleichgestellten verursacht. Er ist es, der uns daran hindert, vom Saṃsāra befreit zu werden, und der alles Leiden aus schädlichen Begegnungen mit Menschen und Nicht-Menschen hervorbringt. Wie es in der *Einführung in den Lebensweg des Bodhisattva* heißt:
> Dies ist derjenige, der mir hunderte Male
> im Kreislauf des Daseins Schaden zugefügt hat.
> Nun, da ich mich dieser Kränkungen entsinne,
> werde ich deine selbstsüchtige Haltung zermalmen.(7)

Wann immer das Greifen nach dem Selbst auftritt, zeigt die Untersuchung, dass es überhaupt kein Selbst gibt. Indem wir hinterfragen, warum wir an einem solchen Selbst festhalten, können wir das Greifen nach dem Selbst aufgeben, sobald es entsteht. Bemühe dich dann, zu verhindern, dass dieses Greifen der Selbstbezogenheit in Zukunft wieder auftritt. Wie es in der *Einführung in den Lebensweg des Bodhisattva* heißt:
> Die Zeit, in der du mir schaden konntest,
> ist vorüber und kommt nicht wieder.
> Ich sehe dich jetzt! Wohin willst du fliehen?
> Ich werde all deinen Hochmut zermalmen.(8)

Da also alles Leid, dem wir begegnen, die Schuld dieses Dämons des Greifens nach dem Selbst ist, müssen wir alles tun, um ihn zu zähmen. Wie Shawopa sagte: „Heute, in diesem kurzen Leben, unterwirf diesen Dämon, ich bitte dich."

Jemand, dessen Absichten und Handlungen darauf gerichtet sind, das eigene Wohlergehen zu sichern, verdient den Namen ‚weltliche Person'; während jemand, dessen Absichten und Handlungen auf den Nutzen anderer gerichtet sind, den Namen eines Dharma-Praktizierenden verdient. Lasst uns daher gemäß der Tradition von Geshe Ben vermeiden und annehmen. Denn Geshe Ben war es, der sagte: „Nun werde ich den Speer des Gegenmittels am Tor des Geistes halten. Ist er wachsam, werde auch ich wachsam sein. Ist er entspannt, werde auch ich mich entspannen."

Das Greifen nach dem Selbst als den Feind zu betrachten und es zu vermeiden, ist das, was Shawopa „das Dharma des Austreibens des Dämons" nannte.(9)`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 14,
    point: 3,
    en: {
      slogan: `Meditate on the great kindness of all.`,
      explanation: `
So that we might regard self-grasping as the enemy and embrace the cherishing of others instead, the root text says:
> Meditate on the great kindness of all.  

Generally speaking, all beings have been our kind parents in the course of beginningless time. They were thus very kind to us in the past. In addition, the attainment of unsurpassable enlightenment also depends on sentient beings. As *Introduction to the Bodhisattva's Way of Life* says:
> Given that a buddha's qualities are gained
> In dependence on ordinary beings and buddhas alike,
> What sense is there in honouring only buddhas
> While not respecting these ordinary beings? (10)
 
For someone training to accomplish buddhahood, buddhas and sentient beings are equal in the extent of their kindness. We must therefore cultivate intense love and compassion for sentient beings; we must take on their negativity and suffering, and give them our happiness and virtue. Should we encounter harmful people or non-human beings in particular, let us consider how these harmdoers have been our mother repeatedly throughout beginningless time. At those times, they did not shy away from unwholesome actions, suffering and gossip in order to secure our well-being. This brought them various forms of suffering in saṃsāra. Now, through the power of delusion, they do not recognize us, dear relatives from the past. Indeed, inspired by our own bad karma, they commit the negative act of harming us, which will only lead them to further suffering in the future. Consider, therefore, how they have long endured suffering for our sake and how they will continue to do so in the future, and cultivate intense compassion for them. Think: "In the past, I only did them harm. Now, I shall dispel all their hurt and bring about their benefit!" And meditate intensively on *tonglen*—giving and taking. 

Do whatever you can to benefit visible beings, such as humans or dogs, directly. Even if you cannot do this, at least make the wish that they might be free from suffering, gain happiness and swiftly attain enlightenment. Make this heartfelt aspiration and even recite it aloud. Generate the intention that whatever virtuous acts you perform from now on will be for their sake.

If the harmdoer is a god or a spirit, think: Throughout beginningless time, I have consumed your flesh and blood, so now in return I offer you my own flesh, blood and so on. Mentally dissect your body in the presence of the harmdoer and surrender it by thinking and even saying aloud, "Eat my flesh and bones! Drink my blood!" Consider that the harmdoer's hunger and thirst are pacified through the consumption of your flesh. Unadulterated bliss fills their body and mind, and they master twofold bodhicitta. Imagine that you offer your body to all the gods and spirits that consume flesh and blood in just the same way and that they all become satisfied, happy and virtuous.

Thus, since all faults arise from self-cherishing, recognize it as the enemy. And since all benefit and happiness comes from sentient beings, view them as close allies and do whatever you can to help them. As Langri Thangpa said: "No matter which profound Dharma texts I consult, I find the message is the same: all faults are one's own and all qualities belong to brother and sister sentient beings. Given this crucial point, the only conclusion is that we must give all profit and victory to others and take all loss and defeat upon ourselves."`,
    },
    de: {
      slogan: `Meditiere auf die große Güte aller.`,
      explanation: `So dass wir das Greifen nach dem Selbst als den Feind betrachten und stattdessen das Wertschätzen anderer annehmen, sagt der Wurzeltext:
> Meditiere auf die große Güte aller.

Allgemein gesprochen sind alle Wesen im Verlauf anfangsloser Zeit unsere gütigen Eltern gewesen. Sie waren also in der Vergangenheit sehr gütig zu uns. Darüber hinaus hängt auch das Erlangen unübertrefflicher Erleuchtung von den fühlenden Wesen ab. Wie es in der *Einführung in den Lebensweg des Bodhisattva* heißt:
> Da die Qualitäten eines Buddha
> in Abhängigkeit von gewöhnlichen Wesen und Buddhas gleichermaßen erlangt werden,
> welchen Sinn hat es dann, nur die Buddhas zu ehren,
> diese gewöhnlichen Wesen aber nicht zu achten?(10)

Für jemanden, der übt, um Buddhaschaft zu verwirklichen, sind Buddhas und fühlende Wesen im Ausmaß ihrer Güte gleich. Wir müssen daher intensive Liebe und Mitgefühl für fühlende Wesen kultivieren; wir müssen ihre Negativität und ihr Leiden auf uns nehmen und ihnen unser Glück und unsere Tugend geben. Sollten wir insbesondere schädlichen Menschen oder nicht-menschlichen Wesen begegnen, so lasst uns betrachten, wie diese Schadenstifter durch anfangslose Zeit hindurch wiederholt unsere Mutter gewesen sind. Damals schreckten sie nicht vor unheilsamen Handlungen, Leiden und übler Nachrede zurück, um unser Wohlergehen zu sichern. Dies brachte ihnen verschiedene Formen des Leidens im Saṃsāra ein. Nun, durch die Kraft der Verblendung, erkennen sie uns nicht — die lieben Verwandten aus der Vergangenheit. Ja, angestiftet durch unser eigenes schlechtes Karma, begehen sie die negative Handlung, uns zu schaden, die sie in Zukunft nur zu weiterem Leiden führen wird. Betrachte daher, wie lange sie um unseretwillen Leiden ertragen haben und wie sie es auch in Zukunft tun werden, und kultiviere intensives Mitgefühl für sie. Denke: „In der Vergangenheit habe ich ihnen nur geschadet. Nun werde ich all ihr Leid vertreiben und ihren Nutzen bewirken!" Und meditiere intensiv auf Tonglen — Geben und Nehmen.

Tu, was immer du kannst, um sichtbaren Wesen wie Menschen oder Hunden unmittelbar zu nützen. Selbst wenn du das nicht kannst, so wünsche zumindest, dass sie frei von Leiden sein, Glück erlangen und rasch die Erleuchtung erreichen mögen. Bringe diesen von Herzen kommenden Wunsch hervor und sprich ihn sogar laut aus. Erwecke die Absicht, dass alle tugendhaften Handlungen, die du von nun an vollbringst, ihnen zugutekommen sollen.

Ist der Schadenstifter ein Gott oder ein Geist, so denke: Durch anfangslose Zeit hindurch habe ich dein Fleisch und Blut verzehrt; nun biete ich dir im Gegenzug mein eigenes Fleisch, Blut und so weiter an. Zerteile deinen Körper im Geiste in Gegenwart des Schadenstifters und gib ihn hin, indem du denkst und sogar laut sagst: „Iss mein Fleisch und meine Knochen! Trink mein Blut!" Betrachte, dass Hunger und Durst des Schadenstifters durch den Verzehr deines Fleisches gestillt werden. Ungetrübte Glückseligkeit erfüllt seinen Körper und Geist, und er meistert das zweifache Bodhicitta. Stelle dir vor, dass du deinen Körper auf dieselbe Weise allen Göttern und Geistern darbringst, die Fleisch und Blut verzehren, und dass sie alle zufrieden, glücklich und tugendhaft werden.

Da also alle Fehler aus der Selbstbezogenheit entstehen, erkenne sie als den Feind. Und da aller Nutzen und alles Glück von den fühlenden Wesen kommt, betrachte sie als enge Verbündete und tu, was immer du kannst, um ihnen zu helfen. Wie Langri Thangpa sagte: „Welche tiefgründigen Dharma-Texte ich auch zurate ziehe, ich finde stets dieselbe Botschaft: Alle Fehler sind die eigenen, und alle Qualitäten gehören den fühlenden Wesen, unseren Brüdern und Schwestern. Angesichts dieses entscheidenden Punktes bleibt nur der Schluss, dass wir allen Gewinn und Sieg den anderen geben und alle Verluste und Niederlagen auf uns nehmen müssen."`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 15,
    point: 3,
    en: {
      slogan: `Meditating on delusory perceptions as the four kāyas is the unsurpassable śūnyatā protection.`,
      explanation: `
**Transforming Adversity into the Path of Enlightenment through Ultimate Bodhicitta**
The root text says:
> Meditating on delusory perceptions as the four kāyas
> Is the unsurpassable śūnyatā protection.

Whenever we experience mental afflictions or suffering caused by harm from the outer environment or beings within it, these afflictions and sufferings are delusory perceptions of our own mind. They thus lack even the slightest true existence. Such relative appearances are comparable to a dream in which we are burnt by fire or drowned in water. It would be an error to mistake what is unreal for reality. All phenomena ultimately lack true reality, so look into the essence of any mental affliction or experience of suffering. Since it does not arise from anywhere in the beginning, it is the unborn dharmakāya. What is unarisen does not cease, so it is the unceasing sambhogakāya. Since what neither arises nor ceases does not remain in the interim, it is the non-abiding nirmāṇakāya. And since these are indivisible in essence, it is the svabhāvikakāya. Viewing delusory perceptions as the four buddha-
bodies in this way is known as the instruction on recognizing the four kāyas.

Whatever harms us also proves to be very kind, since it inspires our training in the two types of bodhicitta. The harmdoer highlights how we are without an antidote and how we fail to notice the onset of the mental afflictions, so they are like an emanation of the teacher or buddha. Should you undergo intense suffering as a result of a serious illness like leprosy, think: "Were it not for this suffering I would be caught up in preparations for this life. But this has caused me to remember the
Dharma when I had failed to do so. It must therefore be the activity of the guru and the Three Jewels."

In short, we must arrive at the heartfelt conviction that just as bodhicitta arises in dependence on the guru, twofold bodhicitta can also develop based on harmdoers and suffering, and these are herefore equivalent.`,
    },
    de: {
      slogan: `Auf die trügerischen Wahrnehmungen als die vier kāyas zu meditieren ist der unübertreffliche śūnyatā Schutz.`,
      explanation: `**Widrigkeiten durch letztendliches Bodhicitta in den Weg zur Erleuchtung transformieren**
Der Wurzeltext sagt:
> Auf die trügerischen Wahrnehmungen als die vier kāyas zu meditieren
> ist der unübertreffliche śūnyatā Schutz.

Wann immer wir geistige Affliktionen oder Leiden erfahren, die durch Schaden von der äußeren Umgebung oder den Wesen darin verursacht werden, sind diese Affliktionen und Leiden trügerische Wahrnehmungen unseres eigenen Geistes. Daher fehlt ihnen selbst die geringste wahre Existenz.

Solche relativen Erscheinungen sind vergleichbar mit einem Traum, in dem wir von Feuer verbrannt werden oder im Wasser ertrinken. Es wäre ein Irrtum, das Unwirkliche für die Wirklichkeit zu halten. Alle Phänomene entbehren letztlich wahrer Wirklichkeit; schaue daher in die Essenz jeder geistigen Affliktion oder Erfahrung von Leiden. Da sie am Anfang aus nichts entsteht, ist sie der ungeborene Dharmakāya. Was nicht entstanden ist, vergeht nicht — daher ist sie der unaufhörliche Sambhogakāya. Da das, was weder entsteht noch vergeht, auch nicht dazwischen verweilt, ist sie der nicht-verweilende Nirmāṇakāya. Und da diese in ihrer Essenz unteilbar sind, ist sie der Svabhāvikakāya. Trügerische Wahrnehmungen auf diese Weise als die vier Buddha-Körper zu betrachten, ist bekannt als die Unterweisung im Erkennen der vier Kāyas.

Was uns schadet, erweist sich auch als sehr gütig, denn es regt unser Training in den beiden Arten von Bodhicitta an. Der Schadenstifter macht deutlich, dass wir ohne Gegenmittel sind und das Aufkommen der geistigen Affliktionen nicht bemerken; so ist er wie eine Ausstrahlung des Lehrers oder Buddha. Solltest du infolge einer schweren Krankheit wie Lepra intensives Leiden durchmachen, denke: „Gäbe es dieses Leiden nicht, wäre ich in den Vorbereitungen für dieses Leben gefangen. Doch dies hat mich dazu gebracht, mich des Dharma zu entsinnen, als ich es versäumt hatte. Es muss daher das Wirken des Gurus und der Drei Juwelen sein."

Kurz gesagt: Wir müssen zu der von Herzen kommenden Überzeugung gelangen, dass — so wie Bodhicitta in Abhängigkeit vom Guru entsteht — das zweifache Bodhicitta sich auch auf der Grundlage von Schadenstiftern und Leiden entwickeln kann, und dass diese daher gleichwertig sind.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 16,
    point: 3,
    en: {
      slogan: `The fourfold practice is the best of methods.`,
      explanation: `
## ii. Action
The root text then refers to the special practice of accumulation and purification that transforms adversity into the path:
> The fourfold practice is the best of methods.
**1. The Practice of Accumulating Merit**

When suffering befalls you and you think how joyful you would be were the suffering to disappear, contemplate the following: "Not wanting to suffer but wishing to be happy is a sign that one must  accumulate the causes of happiness." So we must make offerings to the guru and Three Jewels, venerate the saṅgha and offer tormas to the elemental spirits. In short, we must put our energy into gathering the accumulations physically, verbally and mentally. We should take refuge, generate bodhicitta, make a maṇḍala offering to the guru and Three Jewels and pray to them fervently, without any hope or fear, saying: "If it is better for me to be sick, bless me with sickness. If it is better for me to be healed, bless me with recovery. If it is better for me to die, bless me with death."

**2. The Practice of Purifying Negative Actions**

If we do not wish to suffer, this is a sign that we must abandon the cause of suffering, which is negative actions. To feel regret for the harmful actions we have committed in the past is the power of repentance; to vow never to repeat them even at the cost of one's life is the power of restraint; to take refuge and generate bodhicitta is the power of support; to meditate on emptiness, recite special dhāraṇīs and mantras and so on is the power of antidotal action. Thus we should confess our misdeeds properly by means of these four powers.

**3. The Practice of Offering to Harmful Influences**

Offer tormas and make heartfelt prayers, saying, "Since you support my training in bodhicitta, you are very kind. Please continue: cause all the suffering of sentient beings to ripen on me!" If you are not able to do this, offer tormas, cultivate loving kindness and compassion, and command them by saying, "Through whatever I do to assist you now and in the longer term, do not obstruct my Dharma practice!"

**4. The Practice of Offering to the Dharma Protectors**

Offer tormas to the Dharma protectors and request them to pacify any circumstances
that might hinder Dharma practice and to create favourable circumstances instead.`,
    },
    de: {
      slogan: `Die vierfache Praxis ist die beste Methode.`,
      explanation: `## ii. Handlung
Der Wurzeltext verweist nun auf die besondere Praxis der Ansammlung und Reinigung, die Widrigkeiten in den Weg verwandelt:
> Die vierfache Praxis ist die beste Methode.

**1. Die Praxis des Ansammelns von Verdienst**

Wenn dich Leiden trifft und du denkst, wie froh du wärst, wenn das Leiden verschwände, dann betrachte Folgendes: „Nicht leiden zu wollen, aber glücklich sein zu wollen, ist ein Zeichen dafür, dass man die Ursachen des Glücks ansammeln muss." Wir müssen also dem Guru und den Drei Juwelen Opfergaben darbringen, den Saṅgha verehren und den Elementargeistern Tormas darbringen. Kurz: Wir müssen unsere Kraft darauf richten, die Ansammlungen körperlich, sprachlich und geistig zu vollziehen. Wir sollten Zuflucht nehmen, Bodhicitta erwecken, dem Guru und den Drei Juwelen ein Maṇḍala darbringen und inständig zu ihnen beten, ohne Hoffnung oder Furcht, und sagen: „Wenn es besser für mich ist, krank zu sein, segne mich mit Krankheit. Wenn es besser für mich ist, geheilt zu werden, segne mich mit Genesung. Wenn es besser für mich ist, zu sterben, segne mich mit dem Tod."

**2. Die Praxis der Reinigung negativer Handlungen**

Wenn wir nicht leiden wollen, ist dies ein Zeichen dafür, dass wir die Ursache des Leidens aufgeben müssen, nämlich negative Handlungen. Reue für die schädlichen Handlungen zu empfinden, die wir in der Vergangenheit begangen haben, ist die Kraft der Reue; zu geloben, sie selbst um den Preis des eigenen Lebens nie zu wiederholen, ist die Kraft der Zurückhaltung; Zuflucht zu nehmen und Bodhicitta zu erwecken, ist die Kraft der Stütze; auf Leerheit zu meditieren, besondere Dhāraṇīs und Mantras zu rezitieren und so weiter, ist die Kraft des gegenwirkenden Handelns. So sollten wir unsere Verfehlungen mittels dieser vier Kräfte in rechter Weise bekennen.

**3. Die Praxis des Darbringens an schädliche Einflüsse**

Bringe Tormas dar und sprich von Herzen kommende Gebete: „Da ihr mein Training in Bodhicitta unterstützt, seid ihr sehr gütig. Fahrt fort: Lasst alles Leiden der fühlenden Wesen auf mir reifen!" Wenn du dazu nicht in der Lage bist, bringe Tormas dar, kultiviere liebende Güte und Mitgefühl und weise sie an, indem du sagst: „Was immer ich jetzt und künftig tue, um euch beizustehen — behindert meine Dharma-Praxis nicht!"

**4. Die Praxis des Darbringens an die Dharma-Beschützer**

Bringe den Dharma-Schützern Tormas dar und bitte sie, alle Umstände zu befrieden, die die Dharma-Praxis behindern könnten, und stattdessen günstige Umstände zu schaffen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 17,
    point: 3,
    en: {
      slogan: `Whatever you encounter, apply the practice.`,
      explanation: `In order to integrate one's immediate circumstances onto the path, one should do as the root text says:
> Whatever you encounter, apply the practice.

Should you experience intense suffering as a result of sudden illness, harmful influences, encountering an enemy, or the like, consider how there are innumerable cases of such suffering in the world and feel compassion for all those affected. Draw all this suffering into your own or consider how this harm assists your training in bodhicitta. Reflect on how it is comparable to the guru's kindness. Should you see someone in distress, immediately take their suffering upon yourself. And whenever you or another experience a strong mental affliction cultivate the heartfelt wish to take on the mental afflictions of others.

All these methods for bringing adversity onto the path put a stop to both hope and fear. Yet even if we ultimately arrive at a path that is without hope and fear, to train with a view of friends and enemies right now is like straightening a crooked tree, as Langri Thangpa would say.`,
    },
    de: {
      slogan: `Was auch immer Dir begegnet, wende die Praxis an.`,
      explanation: `Um die unmittelbaren Umstände in den Weg zu integrieren, sollte man tun, was der Wurzeltext sagt:
> Was auch immer Dir begegnet, wende die Praxis an.

Solltest du infolge plötzlicher Krankheit, schädlicher Einflüsse, der Begegnung mit einem Feind oder dergleichen intensives Leiden erfahren, betrachte, wie es unzählige Fälle solchen Leidens in der Welt gibt, und empfinde Mitgefühl für alle Betroffenen. Ziehe all dieses Leiden in dein eigenes hinein, oder betrachte, wie dieses Leid deinem Training in Bodhicitta hilft. Bedenke, wie es der Güte des Gurus vergleichbar ist. Wenn du jemanden in Not siehst, nimm sein Leiden sofort auf dich. Und wann immer du oder jemand anderes eine starke geistige Affliktion erlebt, kultiviere den herzlichen Wunsch, die geistigen Affliktionen anderer auf dich zu nehmen.

All diese Methoden, Widrigkeiten auf den Weg zu bringen, setzen sowohl Hoffnung als auch Furcht ein Ende. Doch selbst wenn wir letztlich zu einem Weg ohne Hoffnung und Furcht gelangen — jetzt mit einer Sicht von Freunden und Feinden zu üben, ist wie das Geradebiegen eines krummen Baumes, wie Langri Thangpa zu sagen pflegte.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 18,
    point: 4,
    en: {
      slogan: `The essence of the instruction, briefly stated, is to apply yourself to the five strengths.`,
      explanation: `# 4. Applying the Practice throughout the Whole of Life
The root text says:
> The essence of the instruction, briefly stated,
> is to apply yourself to the five strengths.

## Five Strengths
The five strengths are as follows:

1. The strength of *impetus* is to create a powerful impetus in the mind, by thinking again and again,"From now on, for this month, this year, throughout my life, and until I attain enlightenment, I shall never part from the two kinds of bodhicitta!"
2. The strength of *familiarization* is to train repeatedly in the two types of bodhicitta.
3. The strength of *wholesome seeds* is to accumulate merit as much as possible so that bodhicitta may arise and increase.
4. The strength of *revulsion* is to reflect, whenever thoughts of self-cherishing occur, on how this has been the cause of various sufferings throughout beginningless time and how even in this life it is responsible for suffering, negative actions and Dharma's failure to develop as one would wish. And with this, to cast away thoughts of self-cherishing.
5. The strength of *aspiration* is to make an aspiration after every virtuous deed, such as, "From now until I attain enlightenment, may I never part from the training in twofold bodhicitta! May I transform any adversity that arises and make it a support for this practice!" Make offerings to the guru and Three Jewels and to the Dharma protectors. Offer torma and pray that this may come to pass.

These five strengths are said to constitute a practice that brings everything together into a single hūṃ.`,
    },
    de: {
      slogan: `Die Essenz der Unterweisungen ist, kurz gesagt, die Anwendung der fünf Kräfte.`,
      explanation: `# 4. Die Praxis im ganzen Leben anwenden
Der Wurzeltext sagt:
> Die Essenz der Unterweisungen ist, kurz gesagt,
> die Anwendung der fünf Kräfte.

## Die Fünf Kräfte
Die fünf Kräfte sind die folgenden:

1. Die Kraft des *Antriebs* besteht darin, einen kraftvollen Antrieb im Geist zu erzeugen, indem man wieder und wieder denkt: „Von nun an — für diesen Monat, dieses Jahr, mein ganzes Leben lang und bis ich die Erleuchtung erlange — werde ich mich nie von den beiden Arten von Bodhicitta trennen!"
2. Die Kraft der *Vertrautheit* besteht darin, wiederholt in den beiden Arten von Bodhicitta zu üben.
3. Die Kraft heilsamer *Samen* besteht darin, so viel Verdienst wie möglich anzusammeln, damit Bodhicitta entstehen und wachsen kann.
4. Die Kraft des *Widerwillens* besteht darin, wann immer Gedanken der Selbstbezogenheit auftreten, darüber nachzudenken, wie diese durch anfangslose Zeit hindurch die Ursache verschiedener Leiden gewesen ist und wie sie selbst in diesem Leben für Leiden, negative Handlungen und das Ausbleiben der erhofften Entwicklung des Dharma verantwortlich ist — und damit die Gedanken der Selbstbezogenheit von sich zu werfen.
5. Die Kraft der *Aspiration* besteht darin, nach jeder tugendhaften Tat einen Wunsch zu äußern, wie etwa: „Von jetzt an, bis ich die Erleuchtung erlange, möge ich mich nie vom Training im zweifachen Bodhicitta trennen! Möge ich jede Widrigkeit, die entsteht, transformieren und zu einer Stütze dieser Praxis machen!" Bringe dem Guru und den Drei Juwelen sowie den Dharma-Schützern Opfergaben dar. Bringe Torma dar und bete, dass dies in Erfüllung gehen möge.

Von diesen fünf Kräften heißt es, sie bildeten eine Praxis, die alles in einem einzigen Hūṃ zusammenführt.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 19,
    point: 4,
    en: {
      slogan: `The mahāyāna advice for transference involves the same five strengths. Conduct is important.`,
      explanation: `## For the Moment of Death
One might wonder about the instructions for the moment of death according to this tradition, so the root text says:
> The mahāyāna advice for transference
> Involves the same five strengths. Conduct is important.

When someone who practises this teaching contracts an illness that is certain to prove fatal, the practice of *wholesome seeds* is to offer all one's possessions to the greatest possible source of merit, such as the teacher or the Three Jewels. This should be done without any clinging or attachment. 

Then the strength of *aspiration* is to offer the seven branches to the guru and Three Jewels and to make fervent prayers of aspiration such as, "Grant your blessings so that during the bardo and in all my future lives, I may continue to train in twofold bodhicitta! Grant your blessings so that I may encounter a guru who teaches this instruction!"

The strength of *revulsion* is to think: "Thoughts of self-cherishing have forced me to suffer in the past, and unless I can be free of them in the future they will continue to prevent my happiness. Even though I have cherished this body of mine, still it suffers. If I examine, there is nothing in either body or mind that is graspable as self." With this understanding, one abandons self-grasping.

The strength of *impetus* is to cultivate the strong intention again and again that one will train in twofold bodhicitta during the bardo. 

Then the strength of *familiarization* is to recollect the ways one has trained in twofold bodhicitta in the past. 

The particular conduct is to lie on one's right side, with the right hand supporting the right cheek. With the little finger of that hand, close the right nostril and breathe through the left. Then, with love and compassion as a preliminary, train in giving and taking as you breathe in and out. After this, consider that everything within saṃsāra and nirvāṇa including birth and death is only a mental projection while mind itself is not truly existent in any way. Then rest in this state of understanding, without clinging to anything at all. Thus, one passes away while combining and meditating upon the two types of bodhicitta. It is said that although there are a great many instructions for the moment of death, none is more wonderful than this.`,
    },
    de: {
      slogan: `Der Mahāyāna Rat für die Übertragung umfasst dieselben fünf Kräfte. Verhalten ist wichtig.`,
      explanation: `## Für den Moment des Todes
Man könnte sich fragen, welche Unterweisungen diese Tradition für den Moment des Todes bereithält, daher sagt der Wurzeltext:
> Der Mahāyāna Rat für die Übertragung
> umfasst dieselben fünf Kräfte. Verhalten ist wichtig.

Wenn jemand, der diese Lehre praktiziert, eine Krankheit bekommt, die mit Sicherheit tödlich verlaufen wird, besteht die Praxis der heilsamen Samen darin, all seinen Besitz der größtmöglichen Quelle von Verdienst darzubringen, etwa dem Lehrer oder den Drei Juwelen. Dies sollte ohne jedes Festhalten und ohne Anhaftung geschehen.

Dann besteht die Kraft der Aspiration darin, dem Guru und den Drei Juwelen die sieben Zweige darzubringen und inständige Wunschgebete zu sprechen, wie etwa: „Gewährt euren Segen, dass ich im Bardo und in all meinen künftigen Leben weiter im zweifachen Bodhicitta üben möge! Gewährt euren Segen, dass ich einem Guru begegnen möge, der diese Unterweisung lehrt!"

Die Kraft des Widerwillens besteht darin, zu denken: „Gedanken der Selbstbezogenheit haben mich in der Vergangenheit zum Leiden gezwungen, und wenn ich in Zukunft nicht frei von ihnen sein kann, werden sie weiterhin mein Glück verhindern. Obwohl ich diesen meinen Körper wertgehalten habe, leidet er dennoch. Wenn ich untersuche, gibt es weder im Körper noch im Geist irgendetwas, das als Selbst greifbar wäre." Mit diesem Verständnis gibt man das Greifen nach dem Selbst auf.

Die Kraft des Antriebs besteht darin, wieder und wieder die feste Absicht zu kultivieren, im Bardo im zweifachen Bodhicitta zu üben.

Dann besteht die Kraft der Vertrautheit darin, sich zu vergegenwärtigen, wie man in der Vergangenheit im zweifachen Bodhicitta geübt hat.

Das besondere Verhalten besteht darin, auf der rechten Seite zu liegen, wobei die rechte Hand die rechte Wange stützt. Schließe mit dem kleinen Finger dieser Hand das rechte Nasenloch und atme durch das linke. Dann übe, mit Liebe und Mitgefühl als Vorbereitung, beim Ein- und Ausatmen Geben und Nehmen. Betrachte danach, dass alles innerhalb von Saṃsāra und Nirvāṇa, einschließlich Geburt und Tod, nur eine geistige Projektion ist, während der Geist selbst in keiner Weise wahrhaft existiert. Ruhe dann in diesem Zustand des Verstehens, ohne an irgendetwas festzuhalten. So stirbt man, während man die beiden Arten von Bodhicitta vereint und über sie meditiert. Es heißt, dass es zwar sehr viele Unterweisungen für den Moment des Todes gibt, doch keine wunderbarer ist als diese.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 20,
    point: 5,
    en: {
      slogan: `All teachings share a single purpose.`,
      explanation: `# 5. The Measure of Mind Training
The root text says:
> All teachings share a single purpose.

The purpose of all the teachings of the greater and lesser vehicles is to tame self-grasping. This means that Dharma practice is meaningless—no matter how much one does—unless it functions as an antidote to self-grasping. If the Dharma does function as an antidote to self-grasping that is a sign that mind training has developed in one's being. This is the real indication of progress in the Dharma, so it is likened to the bar on the balancing scales that weigh practitioners.`,
    },
    de: {
      slogan: `Alle Belehrungen haben das gleiche Ziel.`,
      explanation: `# 5. Der Maßstab des Geistestrainings
Der Wurzeltext sagt:
> Alle Belehrungen haben das gleiche Ziel.

Der Zweck aller Lehren der größeren und kleineren Fahrzeuge ist es, das Greifen nach dem Selbst zu zähmen. Das bedeutet, dass Dharma-Praxis bedeutungslos ist — ganz gleich, wie viel man tut —, solange sie nicht als Gegenmittel gegen das Greifen nach dem Selbst wirkt. Wenn das Dharma als Gegenmittel gegen das Greifen nach dem Selbst wirkt, ist das ein Zeichen dafür, dass sich das Geistestraining im eigenen Wesen entwickelt hat. Dies ist das wahre Anzeichen für Fortschritt im Dharma; daher wird es mit dem Balken der Waage verglichen, auf der Praktizierende gewogen werden.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 21,
    point: 5,
    en: {
      slogan: `Of the two witnesses, rely upon the principal one.`,
      explanation: `The root text says:
> Of the two witnesses, rely upon the principal one.

Others might say, "This brother is an example of the saying that one in whom the Dharma has arisen is a fine practitioner." Not meeting others' disapproval is indeed a form of testimony, but do not take it to be the most important. Ordinary people in this world cannot read minds, so they might be satisfied with glimpsing a fraction of outer conduct. The principal witness, therefore, is an unembarassed look at one's own mind. To examine oneself thoroughly with an honest mind and have no cause to feel ashamed is a sign of having trained the mind. So generate the antidotes and make an effort not to discredit yourself.`,
    },
    de: {
      slogan: `Bei zwei Zeugen verlass Dich auf den Hauptzeugen.`,
      explanation: `Der Wurzeltext sagt:
> Bei zwei Zeugen verlass Dich auf den Hauptzeugen.

Andere mögen sagen: „Dieser Bruder ist ein Beispiel für das Sprichwort, dass jemand, in dem das Dharma entstanden ist, ein guter Praktizierender ist." Nicht auf die Missbilligung anderer zu stoßen, ist in der Tat eine Form von Zeugnis, doch halte es nicht für das wichtigste. Gewöhnliche Menschen in dieser Welt können keine Gedanken lesen; sie geben sich vielleicht damit zufrieden, einen Bruchteil des äußeren Verhaltens zu erblicken. Der Hauptzeuge ist daher ein unbeschämter Blick auf den eigenen Geist. Sich mit einem ehrlichen Geist gründlich zu prüfen und keinen Grund zur Scham zu haben, ist ein Zeichen dafür, den Geist trainiert zu haben. Bringe also die Gegenmittel hervor und bemühe dich, dich nicht selbst zu entehren.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 22,
    point: 5,
    en: {
      slogan: `Always maintain only a joyful attitude.`,
      explanation: `The root text says:
> Always maintain only a joyful attitude.

Through the force of training the mind well, we can be confident that we will be able to integrate any adversity we might face into the path of mind training. This is a measure of having trained the mind.So whatever negative circumstances arise, cultivate joy. And train yourself so that you have no hesitation in taking on the adversity of others as well.`,
    },
    de: {
      slogan: `Bewahre immer eine freudvolle Haltung.`,
      explanation: `Der Wurzeltext sagt:
> Bewahre immer eine freudvolle Haltung.

Durch die Kraft eines guten Geistestrainings können wir zuversichtlich sein, dass wir jede Widrigkeit, der wir begegnen, in den Weg des Geistestrainings einbinden können. Dies ist ein Maß dafür, den Geist trainiert zu haben. Welche negativen Umstände also auch entstehen, kultiviere Freude. Und trainiere dich so, dass du keine Zögerlichkeit hast, auch die Widrigkeiten anderer auf dich zu nehmen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 23,
    point: 5,
    en: {
      slogan: `If this can be done even when distracted, you are proficient.`,
      explanation: `The root text says:
> If this can be done even when distracted, you are proficient.

A skilled rider will not fall from a horse even when distracted. Similarly, whenever adversity arises, such as sudden harm from people, if we do not feel anger but transform the adversity into a support for mind training, this is a measure of having trained the mind. Make an effort, therefore, and train to reach this level. 

These various measures of mastery are all signs of having trained the mind, but this does not imply that there is no need for further training. Continue to make an effort and train the mind even after these signs arise.`,
    },
    de: {
      slogan: `Wenn dies auch bei Ablenkung gehalten werden kann, bist Du erfahren.`,
      explanation: `Der Wurzeltext sagt:
> Wenn dies auch bei Ablenkung gehalten werden kann, bist Du erfahren.

Ein geschickter Reiter wird selbst bei Ablenkung nicht vom Pferd fallen. Ebenso: Wenn wir, wann immer Widrigkeit entsteht — etwa plötzliches Leid durch andere Menschen —, keinen Zorn empfinden, sondern die Widrigkeit in eine Stütze für das Geistestraining verwandeln, ist dies ein Maß dafür, den Geist trainiert zu haben. Bemühe dich daher und übe, um diese Stufe zu erreichen.

Diese verschiedenen Maße der Meisterschaft sind alle Zeichen dafür, den Geist trainiert zu haben; doch das bedeutet nicht, dass kein weiteres Training mehr nötig wäre. Bemühe dich weiterhin und trainiere den Geist auch dann noch, wenn diese Zeichen aufgetreten sind.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 24,
    point: 6,
    en: {
      slogan: `Train constantly in three basic principles.`,
      explanation: `# 6. The Commitments of Mind Training
The root text says:
> Train constantly in three basic principles.

The three basic principles are 1) not to transgress the mind training commitments, 2) not to be reckless, and 3) not to fall into partiality.

1. Avoid telling yourself that you are a practitioner of mind training who can ignore lesser precepts. Instead, with the intention of training the mind, guard all the precepts you have taken, from the vows of individual liberation through to the commitments of the Vajrayāna, and do not allow them to decline.
2. Avoid all forms of reckless behaviour intended to demonstrate to others that you have no self-cherishing, such as chopping down powerful trees or befriending lepers. Take care not to conflict with the example of the masters of the Kadam tradition founded upon the teachings of Geshe Dromtönpa at Radreng Monastery.
3. Avoid all forms of partiality, such as tolerating abuse from human beings but not from non-human beings, respecting the powerful while disrespecting the weak, and loving one's friends but hating enemies. Instead apply the training universally.`,
    },
    de: {
      slogan: `Übe stets die drei grundlegenden Prinzipien.`,
      explanation: `# 6. Die Verpflichtungen des Geistestrainings
Der Wurzeltext sagt:
> Übe stets die drei grundlegenden Prinzipien.

Die drei grundlegenden Prinzipien sind 1) die Verpflichtungen des Geistestrainings nicht zu übertreten, 2) nicht leichtsinnig zu sein und 3) nicht in Parteilichkeit zu verfallen.

1. Vermeide es, dir zu sagen, du seiest ein Praktizierender des Geistestrainings, der geringere Gebote missachten kann. Bewahre stattdessen, mit der Absicht, den Geist zu trainieren, alle Gelübde, die du genommen hast — von den Gelübden der individuellen Befreiung bis zu den Verpflichtungen des Vajrayāna — und lass sie nicht verfallen.
2. Vermeide alle Formen rücksichtslosen Verhaltens, mit denen du anderen zeigen willst, dass du keine Selbstbezogenheit hast, wie etwa das Fällen mächtiger Bäume oder den Umgang mit Leprakranken. Achte darauf, nicht im Widerspruch zum Beispiel der Meister der Kadam-Tradition zu stehen, die auf den Lehren von Geshe Dromtönpa im Kloster Radreng gegründet wurde.
3. Vermeide alle Formen der Parteilichkeit, wie etwa Beschimpfungen von Menschen zu ertragen, nicht aber von nicht-menschlichen Wesen; die Mächtigen zu achten, die Schwachen aber zu missachten; und die eigenen Freunde zu lieben, Feinde aber zu hassen. Wende das Training stattdessen allumfassend an.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 25,
    point: 6,
    en: {
      slogan: `Change your attitude, but remain natural.`,
      explanation: `The root text says:
> Change your attitude, but remain natural.

Transform your attitude from one of self-cherishing to one of cherishing others, while ensuring that your actions of body and speech are in harmony with those of our Dharma companions. It is said that all mind training practices should involve "making great progress but with few outward indications." Mature your mind, therefore, in a way that is imperceptible to others.`,
    },
    de: {
      slogan: `Ändere Deine Haltung, aber bleibe natürlich.`,
      explanation: `Der Wurzeltext sagt:
> Ändere Deine Haltung, aber bleibe natürlich.

Verwandle deine Haltung von Selbstbezogenheit in das Wertschätzen anderer, und sorge zugleich dafür, dass deine Handlungen von Körper und Sprache mit denen unserer Dharma-Gefährten im Einklang sind. Es heißt, dass alle Praktiken des Geistestrainings „großen Fortschritt bei wenigen äußeren Anzeichen" mit sich bringen sollten. Lass deinen Geist daher auf eine Weise reifen, die für andere nicht wahrnehmbar ist.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 26,
    point: 6,
    en: {
      slogan: `Don’t speak of injured limbs.`,
      explanation: `> Don ’t speak of injured limbs.

Do not say unpleasant things about others, whether this is pointing out disabilities such as blindness or spiritual flaws such as compromised ethical discipline.`,
    },
    de: {
      slogan: `Sprich nicht über verletzte Glieder.`,
      explanation: `> Sprich nicht über verletzte Glieder.

Sage nichts Unangenehmes über andere, sei es das Hinweisen auf Behinderungen wie Blindheit oder auf spirituelle Fehler wie geschwächte ethische Disziplin.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 27,
    point: 6,
    en: {
      slogan: `Don’t ponder others’ flaws.`,
      explanation: `> Don’t ponder others ’ flaws.

Whenever you see faults in sentient beings in general or especially in those who have entered the door of the Dharma, attribute this to your own impure perception. Think that there is no certainty (11) that the person has such a flaw and put an end to your critical patterns of thought.`,
    },
    de: {
      slogan: `Beschäftige Dich nicht mit den Makeln anderer.`,
      explanation: `> Beschäftige Dich nicht mit den Makeln anderer.

Wann immer du Fehler in fühlenden Wesen im Allgemeinen oder besonders in jenen siehst, die durch das Tor des Dharma eingetreten sind, führe dies auf deine eigene unreine Wahrnehmung zurück. Denke, dass es keine Gewissheit(11) darüber gibt, dass die Person einen solchen Fehler hat, und setze deinen kritischen Denkmustern ein Ende.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 28,
    point: 6,
    en: {
      slogan: `Train first with the strongest destructive emotions.`,
      explanation: `> Train first with the strongest destructive emotions.

  Check to see which is the strongest destructive emotion in your mind and, combining all practices into an antidote to that emotion, address it first.`,
    },
    de: {
      slogan: `Übe zuerst mit den stärksten störenden Gefühlen.`,
      explanation: `> Übe zuerst mit den stärksten störenden Gefühlen.

Prüfe, welches störende Gefühl in deinem Geist am stärksten ist, und richte es zuerst an, indem du alle Praktiken zu einem Gegenmittel gegen eben dieses Gefühl zusammenführst.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 29,
    point: 6,
    en: {
      slogan: `Abandon any expectations of results.`,
      explanation: `> Abandon any expectations of results.

Let go of all selfish concerns, such as seeking to gain wealth and respect in this life, happiness in future lives as a god or human being, or gaining nirvāṇa for oneself, as a result of practising mind training.`,
    },
    de: {
      slogan: `Lass jegliche Erwartungen an Ergebnisse los.`,
      explanation: `> Lass jegliche Erwartungen an Ergebnisse los.

Lass alle selbstbezogenen Anliegen los, etwa in diesem Leben Wohlstand und Respekt zu gewinnen, in zukünftigen Leben als Gott oder Mensch Glück zu erlangen oder Nirvāṇa für dich selbst zu gewinnen, als Ergebnis der Praxis des Geistestrainings.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 30,
    point: 6,
    en: {
      slogan: `Give up poisonous food.`,
      explanation: `> Give up poisonous food.

Abandon all virtuous activity that is contaminated by clinging to things as real or thoughts of self-cherishing, just as you would avoid food that is laced with poison.`,
    },
    de: {
      slogan: `Gib das vergiftete Essen auf.`,
      explanation: `> Gib das vergiftete Essen auf.

Lass jede tugendhafte Aktivität los, die durch das Festhalten an Dingen als wirklich oder durch Gedanken der Selbstbezogenheit verunreinigt ist, so wie du Nahrung meiden würdest, die mit Gift versetzt ist.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 31,
    point: 6,
    en: {
      slogan: `Don’t be so loyal to the cause.`,
      explanation: `> Don’t be so loyal to the cause.

Avoid holding grudges based on the harm others do to you and refusing to let go of resentment.`,
    },
    de: {
      slogan: `Sei nicht so loyal mit der Ursache.`,
      explanation: `> Sei nicht so loyal mit der Ursache.

Vermeide es, Groll festzuhalten aufgrund des Schadens, den andere dir zufügen, und weigere dich nicht, Verbitterung loszulassen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 32,
    point: 6,
    en: {
      slogan: `Don’t lash out in retaliation.`,
      explanation: `> Don’t lash out in retaliation.

When others speak ill of you, do not respond with harsh words intended to hurt. And do not label misfortune as a just reward.`,
    },
    de: {
      slogan: `Übe nicht Vergeltung.`,
      explanation: `> Übe nicht Vergeltung.

Wenn andere schlecht über dich sprechen, antworte nicht mit harten Worten, die verletzen sollen. Und bezeichne Unglück nicht als gerechte Vergeltung.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 33,
    point: 6,
    en: {
      slogan: `Don’t lie in ambush.`,
      explanation: `> Don’t lie in ambush.

Do not dwell on the harm others do to you while waiting for an opportunity to retaliate.`,
    },
    de: {
      slogan: `Liege nicht im Hinterhalt.`,
      explanation: `> Liege nicht im Hinterhalt.

Verweile nicht bei dem Schaden, den andere dir zufügen, während du auf eine Gelegenheit zur Vergeltung wartest.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 34,
    point: 6,
    en: {
      slogan: `Don’t strike a vulnerable point.`,
      explanation: `> Don’t strike a vulnerable point.

Do not act in a way that causes pain to the minds of others, such as by exposing people's hidden faults or reciting the "life-force mantras" of non-human beings.`,
    },
    de: {
      slogan: `Berühre nicht einen wunden Punkt.`,
      explanation: `> Berühre nicht einen wunden Punkt.

Handle nicht auf eine Weise, die den Geist anderer verletzt, etwa indem du verborgene Fehler von Menschen aufdeckst oder die „Lebenskraft-Mantras" nichtmenschlicher Wesen rezitierst.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 35,
    point: 6,
    en: {
      slogan: `Don’t transfer the ox’s burden to the cow.`,
      explanation: `> Don’t transfer the ox’s burden to the cow.
 
Avoid the negative behaviour of deviously transferring to others any responsibility or blame that is rightly yours.`,
    },
    de: {
      slogan: `Bürde nicht die Last eines Ochsen einer Kuh auf.`,
      explanation: `> Bürde nicht die Last eines Ochsen einer Kuh auf.

Vermeide das negative Verhalten, anderen auf hinterlistige Weise irgendeine Verantwortung oder Schuld zu übertragen, die eigentlich dir zusteht.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 36,
    point: 6,
    en: {
      slogan: `Don’t be competitive.`,
      explanation: `> Don’t be competitive.

Avoid any thoughts and actions focused on acquiring through various means possessions that are held in common.`,
    },
    de: {
      slogan: `Wetteifere nicht mit anderen.`,
      explanation: `> Wetteifere nicht mit anderen.

Vermeide alle Gedanken und Handlungen, die darauf ausgerichtet sind, sich auf verschiedene Weise Besitztümer anzueignen, die gemeinsam gehalten werden.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 37,
    point: 6,
    en: {
      slogan: `Don’t misperform the rites.`,
      explanation: `> Don’t misperform the rites.

To take on others' defeat out of a wish for one's own ultimate happiness or to train the mind in order to pacify demons, harmful influences and sickness is just like practising a mundane rite in order to avert misfortune. We must avoid such selfish concerns. Mind training that involves a partial attitude and which is understood as a beneficial method for dealing with demons and harmful influences is no different from shamanic ritual. To qualify as Dharma it must function as an antidote to mental afflictions and ordinary thoughts.`,
    },
    de: {
      slogan: `Führe die Riten nicht falsch aus.`,
      explanation: `> Führe die Riten nicht falsch aus.

Die Niederlage anderer auf sich zu nehmen aus dem Wunsch nach dem eigenen letztlichen Glück, oder den Geist zu trainieren, um Dämonen, schädliche Einflüsse und Krankheit zu befrieden, ist nichts anderes, als einen weltlichen Ritus auszuführen, um Unglück abzuwenden. Solche selbstbezogenen Anliegen müssen wir vermeiden. Geistestraining, das eine partielle Haltung einschließt und als nützliche Methode gegen Dämonen und schädliche Einflüsse verstanden wird, ist nicht anders als schamanisches Ritual. Um als Dharma zu gelten, muss es als Gegenmittel gegen geistige Affliktionen und gewöhnliche Gedanken wirken.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 38,
    point: 6,
    en: {
      slogan: `Don’t reduce gods to demons.`,
      explanation: `> Don’t reduce gods to demons.
      
Worldly people, when their own gods are displeased and cause them harm, say that the god has been reduced to a demon. Like that, if the practice of mind training leads to an increase in pride and arrogance, the Dharma has become non-Dharma. Mind training must discipline one's character. If one's character only becomes puffed up with pride, the Dharma has failed to hit home. This is like performing a ransom ritual at the western door when a demon is causing trouble at the eastern door. The medicine needs to be applied directly to the site of the illness. Let us abandon self-cherishing and act as the most humble servant to all.`,
    },
    de: {
      slogan: `Reduziere Götter nicht auf Dämonen.`,
      explanation: `> Reduziere Götter nicht auf Dämonen.

Weltliche Menschen sagen, wenn ihre eigenen Götter unzufrieden sind und ihnen schaden, der Gott sei zu einem Dämon geworden. Ebenso gilt: Wenn die Praxis des Geistestrainings zu einer Zunahme von Stolz und Arroganz führt, ist das Dharma zu Nicht-Dharma geworden. Geistestraining muss den eigenen Charakter disziplinieren. Wenn der eigene Charakter sich nur vor Stolz aufbläht, hat das Dharma sein Ziel verfehlt. Das ist, als führte man ein Loskaufritual an der Westtür aus, während ein Dämon an der Osttür Unruhe stiftet. Die Medizin muss unmittelbar am Ort der Krankheit angewendet werden. Lasst uns die Selbstbezogenheit aufgeben und allen als demütigster Diener dienen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 39,
    point: 6,
    en: {
      slogan: `Don’t seek others’ misery as crutches of your own happiness.`,
      explanation: `> Don’t seek others’ misery as crutches of your own happiness.

Avoid wishing that others suffer as a means to your own happiness. Do not think, for example, "If my close relative or friend were to die, I would get their food, wealth, books and so on," "If my patron were to fall sick and die, I would have the chance to accumulate merit," "If my meditator colleague were to die, I would have the chance to accumulate merit by myself," and "If my enemy were to die, I would no longer be harmed and would have the chance to thrive."`,
    },
    de: {
      slogan: `Suche nicht das Elend anderer als Krücke für Dein eigenes Glück.`,
      explanation: `> Suche nicht das Elend anderer als Krücke für Dein eigenes Glück.

Vermeide den Wunsch, dass andere leiden, als Mittel zu deinem eigenen Glück. Denke zum Beispiel nicht: „Wenn mein naher Verwandter oder Freund stürbe, bekäme ich seine Nahrung, seinen Reichtum, seine Bücher und so weiter", „Wenn mein Gönner krank würde und stürbe, hätte ich die Gelegenheit, Verdienst anzusammeln", „Wenn mein Meditationsgefährte stürbe, hätte ich die Gelegenheit, allein Verdienst anzusammeln", und „Wenn mein Feind stürbe, würde mir kein Schaden mehr zugefügt und ich hätte die Gelegenheit zu gedeihen."`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 40,
    point: 7,
    en: {
      slogan: `Do everything with a single intention.`,
      explanation: `# 7. The Precepts of Mind Training
We must train in methods that ensure mind training does not diminish but
strengthens and improves. The root text says:
> Do everything with a single intention.      

Carry out all activities, such the yogas of eating and dressing, purely with the intention of benefitting others.`,
    },
    de: {
      slogan: `Tue alles mit einer einzigen Absicht.`,
      explanation: `# 7. Die Gebote des Geistestrainings
Wir müssen in Methoden üben, die sicherstellen, dass das Geistestraining nicht schwindet, sondern sich stärkt und verbessert. Der Wurzeltext sagt:
> Tue alles mit einer einzigen Absicht.

Führe alle Aktivitäten, etwa die Yogas des Essens und Ankleidens, rein mit der Absicht aus, anderen zu nützen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 41,
    point: 7,
    en: {
      slogan: `Counter all adversity with a single remedy.`,
      explanation: `> Counter all adversity with a single remedy.

If through practising mind training we experience illness, fall prey to demons and harmful influences, become subject to slander or find that our mental afflictions increase, so that we no longer wish to train the mind we can consider how many people in the world experience similar difficulties. As we feel compassion for them, we can aspire to take all their problems on ourselves and meditate on giving and taking (*tonglen*).`,
    },
    de: {
      slogan: `Begegne allen Widrigkeiten mit einem einzigen Gegenmittel.`,
      explanation: `> Begegne allen Widrigkeiten mit einem einzigen Gegenmittel.

Wenn wir durch die Praxis des Geistestrainings Krankheit erfahren, Dämonen und schädlichen Einflüssen anheimfallen, Verleumdung ausgesetzt sind oder feststellen, dass unsere geistigen Affliktionen zunehmen, sodass wir den Geist nicht mehr trainieren möchten, können wir betrachten, wie viele Menschen auf der Welt ähnliche Schwierigkeiten erleben. Indem wir Mitgefühl für sie empfinden, können wir danach streben, all ihre Probleme auf uns zu nehmen und auf Geben und Nehmen (*Tonglen*) zu meditieren.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 42,
    point: 7,
    en: {
      slogan: `Two tasks: one at the beginning and one at the end.`,
      explanation: `> Two tasks: one at the beginning and one at the end.
      
In the morning create the right impetus by thinking, "Today I shall not part from twofold bodhicitta!" Then maintain mindfulness and awareness accordingly during the day. In the evening when preparing to sleep review the day's activities. If you acted in a way that is contrary to bodhicitta, spell out your faults, confess, and resolve not to repeat the faults in future. If your actions were in accord with bodhicitta, rejoice and aspire to continue in a similar vein.`,
    },
    de: {
      slogan: `Zwei Aufgaben: Eine am Anfang und eine am Ende.`,
      explanation: `> Zwei Aufgaben: Eine am Anfang und eine am Ende.

Erschaffe am Morgen den richtigen Antrieb, indem du denkst: „Heute werde ich mich nicht von der zweifachen Bodhicitta trennen!" Bewahre dann tagsüber entsprechend Achtsamkeit und Gewahrsein. Prüfe am Abend, wenn du dich zum Schlafen bereit machst, die Handlungen des Tages. Wenn du auf eine Weise gehandelt hast, die Bodhicitta widerspricht, benenne deine Fehler, bekenne sie und fasse den Entschluss, sie in Zukunft nicht zu wiederholen. Standen deine Handlungen im Einklang mit Bodhicitta, freue dich und fasse den Wunsch, auf ähnliche Weise fortzufahren.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 43,
    point: 7,
    en: {
      slogan: `Whichever of the two occurs, be patient.`,
      explanation: `> Whichever of the two occurs, be patient.
      
Should you accumulate followers and a wealth of possessions, do not let them become a cause of arrogance. Instead recognize their illusoriness, and aspire that they become a means of benefitting others. Should you become so destitute that you are (as the saying goes) lower than everything but water, recognize that this too is illusory. Take all the hardships of others upon yourself and do not be discouraged.`,
    },
    de: {
      slogan: `Egal, was von den beiden erscheint, sei geduldig.`,
      explanation: `> Egal, was von den beiden erscheint, sei geduldig.

Solltest du Anhänger und Reichtum an Besitztümern ansammeln, lass dies nicht zu einer Ursache von Arroganz werden. Erkenne stattdessen ihre Illusionshaftigkeit und strebe danach, dass sie zu einem Mittel werden, anderen zu nützen. Solltest du so verarmt sein, dass du (wie es im Sprichwort heißt) niedriger bist als alles außer Wasser, erkenne, dass auch dies illusorisch ist. Nimm alle Mühen anderer auf dich und lass dich nicht entmutigen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 44,
    point: 7,
    en: {
      slogan: `Keep the two, even at your life’s expense.`,
      explanation: `> Keep the two, even at your life’s expense.

Unless you keep the commitments of the Dharma in general and mind training in particular you will not experience happiness in this or future lives. So guard them more dearly than your own life.`,
    },
    de: {
      slogan: `Halte die beiden, selbst unter Einsatz Deines Lebens.`,
      explanation: `> Halte die beiden, selbst unter Einsatz Deines Lebens.

Wenn du die Verpflichtungen des Dharma im Allgemeinen und des Geistestrainings im Besonderen nicht bewahrst, wirst du in diesem oder künftigen Leben kein Glück erfahren. Hüte sie daher kostbarer als dein eigenes Leben.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 45,
    point: 7,
    en: {
      slogan: `Train in the three difficulties.`,
      explanation: `> Train in the three difficulties.
    
When mental afflictions arise, it is difficult to notice them in the beginning, difficult to avert them in the middle and difficult to interrupt their continuity in the end. Recognize them, therefore, when they first arise; strengthen the antidote so as to abandon them in the middle; and make every effort to ensure that they do not arise again at the end.`,
    },
    de: {
      slogan: `Übe Dich in den drei Schwierigkeiten.`,
      explanation: `> Übe Dich in den drei Schwierigkeiten.

Wenn geistige Affliktionen entstehen, ist es schwierig, sie am Anfang zu bemerken, schwierig, sie in der Mitte abzuwenden, und schwierig, ihre Kontinuität am Ende zu unterbrechen. Erkenne sie daher, wenn sie zum ersten Mal auftreten; stärke das Gegenmittel, um sie in der Mitte aufzugeben; und bemühe dich nach Kräften, dass sie am Ende nicht wieder entstehen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 46,
    point: 7,
    en: {
      slogan: `Acquire the three main provisions.`,
      explanation: `> Acquire the three main provisions.

The most important provisions for Dharma practice are meeting a good teacher, practising authentically with a workable mind, and gathering the conditions conducive to Dharma practice. When these three are complete, rejoice and make the aspiration that others may similarly gain all three. Should the three be incomplete, consider that many others in the world also lack these prerequisites and are unable to practise Dharma authentically as a result. Feel compassion for them. Cultivate the heartfelt aspiration that their lack of these provisions may ripen on you and that they may come to possess them all.`,
    },
    de: {
      slogan: `Erstrebe die drei Vorbedingungen.`,
      explanation: `> Erstrebe die drei Vorbedingungen.

Die wichtigsten Voraussetzungen für die Dharma-Praxis sind, einem guten Lehrer zu begegnen, authentisch mit einem brauchbaren Geist zu praktizieren und die Bedingungen zu sammeln, die der Dharma-Praxis förderlich sind. Wenn diese drei vollständig sind, freue dich und äußere den Wunsch, dass auch andere alle drei erlangen mögen. Sollten die drei unvollständig sein, betrachte, dass auch viele andere auf der Welt diese Voraussetzungen entbehren und deshalb das Dharma nicht authentisch praktizieren können. Empfinde Mitgefühl für sie. Kultiviere den von Herzen kommenden Wunsch, dass ihr Mangel an diesen Voraussetzungen auf dir reifen möge und sie alle drei besitzen mögen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 47,
    point: 7,
    en: {
      slogan: `Cultivate the three that must not decline.`,
      explanation: `> Cultivate the three that must not decline.
      
Since all the qualities of the great vehicle depend on devotion to the guru, this devotion must not decline. Mind training is the quintessence of Mahāyāna Dharma, so enthusiasm for its practice must not decline. And maintenance of the precepts of the greater and lesser vehicles, from the minor ones onward, must not decline.`,
    },
    de: {
      slogan: `Kultiviere die drei, die nicht abnehmen dürfen.`,
      explanation: `> Kultiviere die drei, die nicht abnehmen dürfen.

Da alle Qualitäten des großen Fahrzeugs von Hingabe an den Guru abhängen, darf diese Hingabe nicht abnehmen. Geistestraining ist die Quintessenz des Mahāyāna-Dharma, daher darf die Begeisterung für seine Praxis nicht abnehmen. Und die Bewahrung der Gebote des größeren und des kleineren Fahrzeugs, von den geringsten an, darf nicht nachlassen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 48,
    point: 7,
    en: {
      slogan: `Keep the three from which you must not separate.`,
      explanation: `> Keep the three inseparable.

Ensure that your body, speech and mind never deviate from virtue.`,
    },
    de: {
      slogan: `Halte die drei, die Du Dich nicht aufgeben darfst.`,
      explanation: `> Halte die drei Untrennbaren.

Sorge dafür, dass dein Körper, deine Rede und dein Geist nie von der Tugend abweichen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 49,
    point: 7,
    en: {
      slogan: `Apply the training impartially to all.`,
      explanation: `> Apply the training impartially to all.
      *[no further commentary in the text]*`,
    },
    de: {
      slogan: `Wende das Training auf alle gleichermaßen an.`,
      explanation: `> Wende das Training auf alle gleichermaßen an.
*[keine weitere Erläuterung im Text]*`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 50,
    point: 7,
    en: {
      slogan: `It is vital that it be deep and all-pervasive.`,
      explanation: `> It is vital that it be deep and all-pervasive.

Mind training must be applied to all sentient beings and insentient objects equally and without partiality. You must apply the techniques to everything that arises in the mind. This should not be mere lip service but deep competence.`,
    },
    de: {
      slogan: `Es ist entscheidend, dass es tiefgründig und alldurchdringend ist.`,
      explanation: `> Es ist entscheidend, dass es tiefgründig und alldurchdringend ist.

Das Geistestraining muss auf alle fühlenden Wesen und unbelebten Dinge gleichermaßen und ohne Parteilichkeit angewendet werden. Du musst die Techniken auf alles anwenden, was im Geist entsteht. Das sollte nicht bloß Lippenbekenntnis sein, sondern tiefe Kompetenz.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 51,
    point: 7,
    en: {
      slogan: `Meditate constantly on those who’ve been set apart.`,
      explanation: `> Meditate constantly on those who’ve been set apart.
    
There are some for whom we find it difficult to feel love and compassion, and they should be the special focus of meditation: rivals, regular companions, those who harm us without provocation, and those who dislike us for karmic reasons.`,
    },
    de: {
      slogan: `Meditiere stets auf diejenigen, die sich unterscheiden.`,
      explanation: `> Meditiere stets auf diejenigen, die sich unterscheiden.

Es gibt einige, für die es uns schwerfällt, Liebe und Mitgefühl zu empfinden, und sie sollten der besondere Fokus der Meditation sein: Rivalen, vertraute Gefährten, jene, die uns ohne Provokation schaden, und jene, die uns aus karmischen Gründen nicht mögen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 52,
    point: 7,
    en: {
      slogan: `Don’t be dependent on external conditions.`,
      explanation: `> Don’t be dependent on external conditions.
      
Do not rely on gathering all the right conditions, such as food and clothing, protection against human and non-human forces, good health and so on. If you cannot gather these conditions integrate that very situation onto the path by means of the two types of bodhicitta.`,
    },
    de: {
      slogan: `Sei nicht abhängig von äußeren Bedingungen.`,
      explanation: `> Sei nicht abhängig von äußeren Bedingungen.

Verlass dich nicht darauf, alle richtigen Bedingungen zu sammeln, etwa Nahrung und Kleidung, Schutz vor menschlichen und nichtmenschlichen Kräften, gute Gesundheit und so weiter. Wenn du diese Bedingungen nicht sammeln kannst, integriere genau diese Situation durch die zwei Arten von Bodhicitta auf den Weg.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 53,
    point: 7,
    en: {
      slogan: `This time, practise what’s most important.`,
      explanation: `> This time, practise what’s most important.
      
All the physical forms we have adopted throughout beginningless time have been to no avail. Now, in this lifetime we must accomplish what is most important. More important than the affairs of this life is the Dharma. More important than Dharma study and teaching is practice. More important than other forms of practice is training in bodhicitta. More important than training through scripture and reasoning is assiduous practice based on the guru's instructions. More important than other forms of conduct is remaining on one's seat and practising. More important than avoiding objects is to apply the antidote. These are the most important things to put into practice.`,
    },
    de: {
      slogan: `Praktiziere dieses Mal das, was am wichtigsten ist.`,
      explanation: `> Praktiziere dieses Mal das, was am wichtigsten ist.

Alle körperlichen Gestalten, die wir durch anfangslose Zeit hindurch angenommen haben, waren vergebens. Jetzt, in diesem Leben, müssen wir das Wichtigste vollbringen. Wichtiger als die Angelegenheiten dieses Lebens ist das Dharma. Wichtiger als Dharma-Studium und Lehren ist Praxis. Wichtiger als andere Formen der Praxis ist das Training in Bodhicitta. Wichtiger als das Üben durch Schrift und Logik ist beharrliche Praxis auf der Grundlage der Unterweisungen des Gurus. Wichtiger als andere Formen des Verhaltens ist es, auf seinem Sitz zu bleiben und zu praktizieren. Wichtiger als das Meiden von Objekten ist es, das Gegenmittel anzuwenden. Dies sind die wichtigsten Dinge, die es in die Praxis umzusetzen gilt.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 54,
    point: 7,
    en: {
      slogan: `Don’t misunderstand.`,
      explanation: `> Don’t misunderstand.
      
There are six forms of misunderstanding to be avoided:

1. Misplaced *patience* is to bear any difficulties related to outdoing one's enemies and protecting one's friends but not the sufferings related to Dharma practice. 
2. Misplaced *intention* is to feel no interest in pure Dharma practice but to take an interest in the glories and riches of this life. 
3. Misplaced *relish* is to fail to savour the taste of the Dharma through study, reflection and meditation but to savour the taste of worldly pleasures. 
4. Misplaced *compassion* is to fail to cultivate compassion for wrongdoers but to cultivate it for those who endure hardship for the sake of the Dharma. 
5. Misplaced *pursuit* is to fail to encourage one's dependents to pursue the Dharma but to encourage them to pursue the means of increasing the glories and riches of this life.
6. Misplaced *joy* is to fail to cultivate joy for the happiness and virtues of saṃsāra and nirvāṇa but to rejoice when rivals suffer.

Avoid these six mistaken forms of practice and take to heart the six unmistaken forms.`,
    },
    de: {
      slogan: `Verstehe nicht falsch.`,
      explanation: `> Verstehe nicht falsch.

Es gibt sechs Formen des Missverstehens, die vermieden werden müssen:

1. Fehlgeleitete *Geduld* bedeutet, alle Schwierigkeiten zu ertragen, die damit verbunden sind, die eigenen Feinde zu übertreffen und die eigenen Freunde zu schützen — nicht aber die Mühen, die mit der Dharma-Praxis verbunden sind.
2. Fehlgeleitete *Absicht* bedeutet, kein Interesse an reiner Dharma-Praxis zu haben, wohl aber an den Herrlichkeiten und Reichtümern dieses Lebens.
3. Fehlgeleiteter *Genuss* bedeutet, den Geschmack des Dharma durch Studium, Nachdenken und Meditation nicht auszukosten, wohl aber den Geschmack weltlicher Vergnügungen.
4. Fehlgeleitetes *Mitgefühl* bedeutet, kein Mitgefühl für Übeltäter zu kultivieren, wohl aber für jene, die um des Dharma willen Entbehrungen auf sich nehmen.
5. Fehlgeleitetes *Streben* bedeutet, Abhängige nicht zu ermutigen, dem Dharma nachzustreben, sondern sie zu ermutigen, den Mitteln zur Mehrung der Herrlichkeiten und Reichtümer dieses Lebens nachzujagen.
6. Fehlgeleitete *Freude* bedeutet, sich nicht an Glück und Tugenden von Saṃsāra und Nirvāṇa zu erfreuen, sondern sich zu freuen, wenn Rivalen leiden.

Vermeide diese sechs fehlgeleiteten Formen der Praxis und nimm dir die sechs nicht fehlgeleiteten Formen zu Herzen.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 55,
    point: 7,
    en: {
      slogan: `Don’t be inconsistent.`,
      explanation: `> Don’t be inconsistent.

Avoid the kind of sporadic practice that can occur when one does not yet have confidence in the Dharma. Train your mind single-pointedly and without interruption.`,
    },
    de: {
      slogan: `Sei nicht inkonsequent.`,
      explanation: `> Sei nicht inkonsequent.

Vermeide die Art von sporadischer Praxis, die auftreten kann, wenn man noch kein Vertrauen in das Dharma hat. Trainiere deinen Geist einspitzig und ohne Unterbrechung.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 56,
    point: 7,
    en: {
      slogan: `Train wholeheartedly.`,
      explanation: `> Train wholeheartedly.

Devote yourself entirely to the mind training and practise emphatically.`,
    },
    de: {
      slogan: `Übe von ganzem Herzen.`,
      explanation: `> Übe von ganzem Herzen.

Widme dich dem Geistestraining vollständig und praktiziere mit Nachdruck.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 57,
    point: 7,
    en: {
      slogan: `Gain freedom through discernment and analysis.`,
      explanation: `> Gain freedom through discernment and analysis.

Determine which of your mental afflictions is the strongest and make that the focus of intensive effort. Investigate whether or not that affliction arises whenever you come into contact with a potentially provocative object. If it does arise, apply an antidote to overcome it, and make every effort until it no longer arises.`,
    },
    de: {
      slogan: `Gewinne Freiheit durch Einsicht und Analyse.`,
      explanation: `> Gewinne Freiheit durch Einsicht und Analyse.

Bestimme, welche deiner geistigen Affliktionen die stärkste ist, und mache sie zum Fokus intensiver Bemühung. Untersuche, ob diese Affliktion entsteht, wann immer du mit einem potenziell provozierenden Objekt in Kontakt kommst. Wenn sie tatsächlich entsteht, wende ein Gegenmittel an, um sie zu überwinden, und bemühe dich, bis sie nicht mehr entsteht.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 58,
    point: 7,
    en: {
      slogan: `Don’t be boastful.`,
      explanation: `> Don’t be boastful.
      
Do not boast about how kind you are to others, how long you have strenuously practised the Dharma, or how learned and disciplined you are. There can be no boasting when you meditate on cherishing others more than yourself. As Radrengpa put it, "Don't have high hopes for human beings; supplicate the deities instead."`,
    },
    de: {
      slogan: `Sei nicht prahlerisch.`,
      explanation: `> Sei nicht prahlerisch.

Prahle nicht damit, wie gütig du zu anderen bist, wie lange du das Dharma angestrengt praktiziert hast oder wie gelehrt und diszipliniert du bist. Es kann kein Prahlen geben, wenn du darüber meditierst, andere mehr wertzuhalten als dich selbst. Wie Radrengpa es ausdrückte: „Setze keine großen Hoffnungen in Menschen; bete stattdessen zu den Gottheiten."`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 59,
    point: 7,
    en: {
      slogan: `Don’t be irritable.`,
      explanation: `> Don’t be irritable.

Do not retaliate even if others humiliate you in front of many people and do not be annoyed. If we practitioners do not make the Dharma an antidote to self-grasping our patience can become more fragile than a baby's skin and we can feel even more irritable than the demon Tsang Tsen. This does not qualify as Dharma, so ensure that Dharma functions properly as an antidote to self-grasping.`,
    },
    de: {
      slogan: `Sei nicht reizbar.`,
      explanation: `> Sei nicht reizbar.

Übe keine Vergeltung, selbst wenn andere dich vor vielen Menschen demütigen, und sei nicht verärgert. Wenn wir Praktizierenden das Dharma nicht zum Gegenmittel gegen das Greifen nach dem Selbst machen, kann unsere Geduld zerbrechlicher werden als die Haut eines Säuglings, und wir können uns noch reizbarer fühlen als der Dämon Tsang Tsen. Das verdient nicht den Namen Dharma; sorge also dafür, dass das Dharma richtig als Gegenmittel gegen das Greifen nach dem Selbst wirkt.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 60,
    point: 7,
    en: {
      slogan: `Don’t be temperamental.`,
      explanation: `> Don’t be temperamental.

Do not change your expression from cheery to depressed at the slightest provocation, because this will only upset your companions.`,
    },
    de: {
      slogan: `Sei nicht launisch.`,
      explanation: `> Sei nicht launisch.

Verändere deinen Ausdruck nicht schon bei der geringsten Provokation von heiter zu niedergeschlagen, denn das wird nur deine Gefährten verstören.`,
    },
    attributionKey: 'commentary',
  },
  {
    id: 61,
    point: 7,
    en: {
      slogan: `Don’t seek acknowledgement.`,
      explanation: `> Don’t seek acknowledgement.

Do not expect words of thanks or fame and renown for benefitting others or practising the Dharma.`,
    },
    de: {
      slogan: `Suche nicht nach Anerkennung.`,
      explanation: `> Suche nicht nach Anerkennung.

Erwarte weder Worte des Dankes noch Ruhm und Ansehen dafür, anderen zu nützen oder das Dharma zu praktizieren.`,
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
  5: { en: 'The Measure of Mind Training', de: 'Der Maßstab des Geistestrainings' },
  6: { en: 'The Commitments of Mind Training', de: 'Die Verpflichtungen des Geistestrainings' },
  7: { en: 'The Precepts of Mind Training', de: 'Die Gebote des Geistestrainings' },
};
