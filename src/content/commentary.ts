import { Language } from '@/i18n/ui';

// Hand-edited markdown for the parts of the commentary that don't belong to
// any single slogan, shown on the full-commentary screen: the introduction
// (before the first point) and the conclusion and bibliography (after the
// last slogan). Same markdown syntax as slogans.ts, rendered by
// src/components/Markdown.tsx. Write headings inside the content itself,
// e.g. `## Introduction`. Empty strings render nothing.
//
// Use backtick strings (`...`) for the content: they can span multiple
// lines and may contain apostrophes and quotes freely. Start each line at
// the left margin — leading indentation would become part of the text.
// A single newline renders as a line break (for verse), so keep each prose
// paragraph on one long line and let the editor soft-wrap it.
//
// Source: Gyalse Tokme Zangpo's "Commentary on the Seven Points of Mind
// Training" (trans. Adam Pearcey), Lotsawa House, CC BY-NC 4.0.

export type CommentaryExtras = {
  introduction: string;
  conclusion: string;
  bibliography: string;
};

export const commentaryExtras: Record<Language, CommentaryExtras> = {
  en: {
    introduction: `# Commentary on the Seven Points of Mind Training

*by Gyalse Tokme Zangpo*

Homage to the great Compassionate One!

Pure in the three trainings and with mastery of twofold bodhicitta,
You spread the Sugata's teachings throughout the ten directions,
As the crowning ornament among all holders of the teachings—
Incomparable guru, at your feet I prostrate myself in homage!

The single path traversed by the buddhas of the three times and their heirs,
A precious treasury that is the source of all benefit and joy,
I shall here set forth, in response to the repeated requests of fortunate disciples
And in reliance upon the guru's speech.

Individuals who seek to attain unsurpassable, complete and perfect awakening must set their minds upon enlightenment and then exert themselves in the cultivation of both relative and ultimate bodhicitta. As Ārya Nāgārjuna said:

> If we ourselves and all the world
> Wish for unsurpassed enlightenment,
> Its basis is bodhicitta,
> Stable as the king of mountains,
> Compassion reaching out in all directions,
> And wisdom that transcends duality.(1)

The great precious, single divine lord Atiśa received instructions on cultivating bodhicitta from three main teachers: the guru Dharmarakṣita, who cut and gave away his own flesh, and realized emptiness purely through cultivating love and compassion; the guru Maitrīyogi, who was able to take others' sufferings directly upon himself; and the guru of Suvarnadvīpa. Here, what follows is the tradition of the Suvarnadvīpa guru.

There are many different ways of presenting this instruction, but the tradition of Geshe Chekawa follows seven points:

1. the preliminary teachings of the supporting instructions;
2. the main practice of training in bodhicitta;
3. how to bring adversity onto the path to enlightenment;
4. how to apply the practice throughout one's whole life;
5. the measure of mind training;
6. the commitments of mind training; and
7. the precepts of mind training.
`,
    conclusion: `Train well like this throughout your entire life, cultivating twofold bodhicitta in meditation sessions and the periods in between. Then you will gain the confidence of mastery.

# Conclusion
> The essence of the nectar-like instructions
> for transforming into the path of awakening
> the five prevalent signs of degeneration
> was passed down from the one from Golden Isle.

At this time when the five signs of degeneration—in time, beings, lifespan, mental afflictions, and view—are widespread, there are few circumstances conducive to happiness and many that provoke suffering, including harm from humans and non-humans. Being entangled in negative circumstances such as these can become a support for mind training. Then, no matter how many negative circumstances one might face, the practice of mind training will ensure that virtue only increases.

This pithy advice from the teacher of Suvarnadvīpa is like a nectar that turns poison into medicine. It is superior to any other instruction. With knowledge of how to train the mind in this way, the body of the mind training practitioner becomes 'the city that is the source of happiness', because it brings about all one's own and others' joys in saṃsāra and nirvāṇa. By applying this to all undertakings and training the mind well, your mind will merge with the Dharma, and it will not be long before you attain the perfect goal for both yourself and others.

The root text says:
> When karmic seeds left over from former trainings were aroused in me,
> I felt great interest, and so, without regard for suffering or disparagement,
> I sought instructions on subduing ego-clinging.
> Now, even in death, I shall have no regrets.

Chekawa, the lord of yogis, says that he trained his mind thoroughly and, in his wisdom, came to cherish others more than himself. He freed himself entirely from the thicket of selfish concern and thereby gained this level of confidence.

> Through the kindness of the Dharma Lord by the name of Drakpa,
> I well received the precious treasury of this oral transmission,
> Through the power of this revelation requested by faithful disciples,
> May all beings come to master the two types of bodhicitta!
 
*This succinct commentary based on the words of the aural lineage of Seven Points of Mind Training was composed in response to repeated requests from Drakpa Gyaltsen, a yogi of the supreme vehicle, by the monk Tokme in his retreat place, the dharma fortress of Ngulchu.*

Translated by Adam Pearcey, 2018.`,
    bibliography: `# Bibliography
## Tibetan Edition
rgyal sras thogs med bzang po. “rgyal ba ʼi sras po thogs med bzang po dpal gyis mdzad pa
ʼi blo sbyong don bdun ma.” In *gdams ngag mdzod*, edited by ʼjam mgon kong sprul blo gros mtha
ʼ yas. Paro: Lama Ngodrup and Sherab Drimey, 1979–1981. Vol. 4: 189–214

## Secondary Sources
Ga Rabjampa. To Dispel the Misery of the World: Whispered Teachings of the Bodhisattvas. trans. Rigpa Translations. Boston: Wisdom Publications, 2012.

Thupten Jinpa. Mind Training: The Great Collection. Boston: Wisdom Publications, 2006.

1. Ratnāvalī II, 74–75
2. Bodhicaryāvatāra VIII, 120
3. Bodhicaryāvatāra VIII, 131
4. Bodhicaryāvatāra VIII, 136
5. Bodhicaryāvatāra VIII, 134
6. Bodhicaryāvatāra VIII, 155
7. Bodhicaryāvatāra VIII, 154
8. Bodhicaryāvatāra VIII, 169
9. 'gong po 'gong rdzong gi chos.
10. Bodhicaryāvatāra VI, 113
11. nyen med. The translation here is tentative.

**Licensed under Creative Commons Attribution-NonCommercial 4.0 International License.**
*https://creativecommons.org/licenses/by-nc/4.0/* 


See *https://www.lotsawahouse.org/tibetan-masters/tokme-zangpo/commentary-seven-points-mind-training* for the original Tibetan text and more information about this translation.`,
  },
  de: {
    introduction: `# Kommentar zu den Sieben Punkten des Geistestrainings

*von Gyalse Tokme Zangpo*

Verehrung dem großen Mitfühlenden!

Rein in den drei Schulungen und mit Meisterschaft im zweifachen Bodhicitta,
verbreitest du die Lehren des Sugata in die zehn Richtungen,
als der krönende Schmuck unter allen Hütern der Lehre —
unvergleichlicher Guru, zu deinen Füßen werfe ich mich in Verehrung nieder!

Den einen Pfad, den die Buddhas der drei Zeiten und ihre Erben beschritten haben,
einen kostbaren Schatz, der die Quelle allen Nutzens und aller Freude ist,
werde ich hier darlegen, in Erwiderung der wiederholten Bitten glücklicher Schüler
und gestützt auf die Worte des Gurus.

Wer danach strebt, unübertreffliches, vollständiges und vollkommenes Erwachen zu erlangen, muss den Geist auf die Erleuchtung richten und sich dann in der Kultivierung sowohl des relativen als auch des letztendlichen Bodhicitta üben. Wie Ārya Nāgārjuna sagte:

> Wenn wir selbst und die ganze Welt
> unübertreffliche Erleuchtung erlangen wollen,
> so ist ihre Grundlage Bodhicitta,
> beständig wie der König der Berge,
> Mitgefühl, das sich in alle Richtungen erstreckt,
> und Weisheit, die Dualität überschreitet.(1)

Der große kostbare, einzigartige göttliche Herr Atiśa empfing Unterweisungen über die Kultivierung von Bodhicitta von drei Hauptlehrern: dem Guru Dharmarakṣita, der sein eigenes Fleisch abschnitt und weggab und Leerheit rein durch die Kultivierung von Liebe und Mitgefühl verwirklichte; dem Guru Maitrīyogi, der fähig war, das Leiden anderer unmittelbar auf sich zu nehmen; und dem Guru von Suvarṇadvīpa. Was hier folgt, ist die Tradition des Guru von Suvarṇadvīpa.

Es gibt viele verschiedene Arten, diese Unterweisung darzulegen, doch die Tradition von Geshe Chekawa folgt sieben Punkten:

1. die vorbereitenden Lehren der unterstützenden Unterweisungen;
2. die Hauptpraxis des Trainings in Bodhicitta;
3. wie man Widrigkeiten in den Weg zur Erleuchtung bringt;
4. wie man die Praxis im ganzen Leben anwendet;
5. der Maßstab des Geistestrainings;
6. die Verpflichtungen des Geistestrainings; und
7. die Gebote des Geistestrainings.
`,
    conclusion: `Übe auf diese Weise gut während deines ganzen Lebens und kultiviere das zweifache Bodhicitta in den Meditationssitzungen und den Zeiten dazwischen. Dann wirst du die Zuversicht der Meisterschaft erlangen.

# Schluss
> Die Essenz der nektargleichen Unterweisungen,
> um die fünf vorherrschenden Zeichen des Verfalls
> in den Weg des Erwachens zu verwandeln,
> wurde überliefert von dem von der Goldenen Insel.

In dieser Zeit, in der die fünf Zeichen des Verfalls — der Zeit, der Wesen, der Lebensspanne, der geistigen Affliktionen und der Sicht — weit verbreitet sind, gibt es wenige Umstände, die dem Glück förderlich sind, und viele, die Leiden hervorrufen, einschließlich des Schadens durch Menschen und Nicht-Menschen. In solche negativen Umstände verstrickt zu sein, kann zu einer Stütze für das Geistestraining werden. Dann wird die Praxis des Geistestrainings dafür sorgen, dass die Tugend nur zunimmt, ganz gleich, wie vielen negativen Umständen man begegnet.

Dieser prägnante Rat des Lehrers von Suvarṇadvīpa ist wie ein Nektar, der Gift in Medizin verwandelt. Er ist jeder anderen Unterweisung überlegen. Mit dem Wissen, den Geist auf diese Weise zu trainieren, wird der Körper des Praktizierenden des Geistestrainings zur ‚Stadt, die die Quelle des Glücks ist', denn er bringt alle eigenen und fremden Freuden in Saṃsāra und Nirvāṇa hervor. Indem du dies auf alle Unternehmungen anwendest und den Geist gut trainierst, wird dein Geist mit dem Dharma verschmelzen, und es wird nicht lange dauern, bis du das vollkommene Ziel für dich selbst und andere erreichst.

Der Wurzeltext sagt:
> Als die karmischen Samen früherer Trainings in mir erwachten,
> empfand ich großes Interesse, und so, ohne Rücksicht auf Leiden oder Verachtung,
> suchte ich Unterweisungen zur Bezwingung des Ich-Anhaftens.
> Nun werde ich, selbst im Tod, keine Reue empfinden.

Chekawa, der Herr der Yogis, sagt, dass er seinen Geist gründlich trainierte und in seiner Weisheit dazu gelangte, andere mehr wertzuschätzen als sich selbst. Er befreite sich vollständig aus dem Dickicht selbstbezogener Anliegen und erlangte dadurch dieses Ausmaß an Zuversicht.

> Durch die Güte des Dharma-Herrn namens Drakpa
> empfing ich wohlbehalten den kostbaren Schatz dieser mündlichen Überlieferung,
> durch die Kraft dieser Offenbarung, erbeten von gläubigen Schülern,
> mögen alle Wesen die beiden Arten von Bodhicitta meistern!

*Dieser prägnante Kommentar, gestützt auf die Worte der Hörlinie der Sieben Punkte des Geistestrainings, wurde in Erwiderung wiederholter Bitten von Drakpa Gyaltsen, einem Yogi des höchsten Fahrzeugs, von dem Mönch Tokme an seinem Rückzugsort, der Dharma-Festung von Ngulchu, verfasst.*

Übersetzt von Adam Pearcey, 2018. Deutsche Übersetzung durch KI (Claude Sonnet 5) basierend auf dieser englischen Version.`,
    bibliography: `# Bibliographie
## Tibetische Ausgabe
rgyal sras thogs med bzang po. „rgyal ba ʼi sras po thogs med bzang po dpal gyis mdzad pa
ʼi blo sbyong don bdun ma." In *gdams ngag mdzod*, herausgegeben von ʼjam mgon kong sprul blo gros mtha
ʼ yas. Paro: Lama Ngodrup and Sherab Drimey, 1979–1981. Bd. 4: 189–214

## Sekundärliteratur
Ga Rabjampa. To Dispel the Misery of the World: Whispered Teachings of the Bodhisattvas. Übers. Rigpa Translations. Boston: Wisdom Publications, 2012.

Thupten Jinpa. Mind Training: The Great Collection. Boston: Wisdom Publications, 2006.

1. Ratnāvalī II, 74–75
2. Bodhicaryāvatāra VIII, 120
3. Bodhicaryāvatāra VIII, 131
4. Bodhicaryāvatāra VIII, 136
5. Bodhicaryāvatāra VIII, 134
6. Bodhicaryāvatāra VIII, 155
7. Bodhicaryāvatāra VIII, 154
8. Bodhicaryāvatāra VIII, 169
9. 'gong po 'gong rdzong gi chos.
10. Bodhicaryāvatāra VI, 113
11. nyen med. Die Übersetzung hier ist vorläufig.

**Lizenziert unter der Creative-Commons-Lizenz Namensnennung – Nicht kommerziell 4.0 International.**
*https://creativecommons.org/licenses/by-nc/4.0/deed.de*


Siehe *https://www.lotsawahouse.org/tibetan-masters/tokme-zangpo/commentary-seven-points-mind-training* für den ursprünglichen tibetischen Text und weitere Informationen zu dieser Übersetzung.`,
  },
};
