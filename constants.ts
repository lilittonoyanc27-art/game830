export interface PuzzleQuestion {
  id: string;
  prompt: string;
  choices: string[];
  target: string;
  translation: string;
}

export const PUZZLE_QUESTIONS: PuzzleQuestion[] = [
  { id: '1', prompt: 'Yo ___ la verdad.', choices: ['digo', 'hablo'], target: 'digo', translation: 'Ես ճշմարտությունն եմ ասում:' },
  { id: '2', prompt: 'Pedro ___ español muy bien.', choices: ['dice', 'habla'], target: 'habla', translation: 'Պեդրոն շատ լավ է խոսում իսպաներեն:' },
  { id: '3', prompt: 'Él me ___ que sí.', choices: ['dice', 'habla'], target: 'dice', translation: 'Նա ինձ ասում է, որ այո:' },
  { id: '4', prompt: 'Nosotros ___ con el profesor.', choices: ['decimos', 'hablamos'], target: 'hablamos', translation: 'Մենք խոսում ենք ուսուցչի հետ:' },
  { id: '5', prompt: '¿Qué ___ tú?', choices: ['dices', 'hablas'], target: 'dices', translation: 'Ի՞նչ ես ասում դու:' },
  { id: '6', prompt: 'Ellos ___ algo importante.', choices: ['dicen', 'hablan'], target: 'dicen', translation: 'Նրանք ինչ-որ կարևոր բան են ասում:' },
  { id: '7', prompt: '¿Quieres ___ conmigo?', choices: ['decir', 'hablar'], target: 'hablar', translation: 'Ուզո՞ւմ ես խոսել ինձ հետ:' },
  { id: '8', prompt: 'Pedro siempre ___ mentiras.', choices: ['dice', 'habla'], target: 'dice', translation: 'Պեդրոն միշտ ստեր է ասում:' },
  { id: '9', prompt: 'Ustedes ___ muy rápido.', choices: ['dicen', 'hablan'], target: 'hablan', translation: 'Դուք շատ արագ եք խոսում:' },
  { id: '10', prompt: 'No me ___ más.', choices: ['digas', 'hables'], target: 'digas', translation: 'Ինձ այլևս մի՛ ասա:' },
  { id: '11', prompt: 'Pedro ___ por teléfono.', choices: ['dice', 'habla'], target: 'habla', translation: 'Պեդրոն խոսում է հեռախոսով:' },
  { id: '12', prompt: '¿Quién ___ esto?', choices: ['dice', 'habla'], target: 'dice', translation: 'Ո՞վ է սա ասում:' },
  { id: '13', prompt: 'Nosotros ___ que no.', choices: ['decimos', 'hablamos'], target: 'decimos', translation: 'Մենք ասում ենք, որ ոչ:' },
  { id: '14', prompt: 'Tú ___ demasiado.', choices: ['dices', 'hablas'], target: 'hablas', translation: 'Դու չափազանց շատ ես խոսում:' },
  { id: '15', prompt: 'Ellos ___ en voz baja.', choices: ['dicen', 'hablan'], target: 'hablan', translation: 'Նրանք ցածրաձայն են խոսում:' },
  { id: '16', prompt: 'Ella no ___ nada.', choices: ['dice', 'habla'], target: 'dice', translation: 'Նա ոչինչ չի ասում:' },
  { id: '17', prompt: 'Vamos a ___ de fútbol.', choices: ['decir', 'hablar'], target: 'hablar', translation: 'Եկեք խոսենք ֆուտբոլից:' },
  { id: '18', prompt: 'Dime, ¿qué ___?', choices: ['dices', 'hablas'], target: 'dices', translation: 'Ասա՛ ինձ, ի՞նչ ես ասում:' },
  { id: '19', prompt: 'Ellos ___ con sus amigos.', choices: ['dicen', 'hablan'], target: 'hablan', translation: 'Նրանք խոսում են իրենց ընկերների հետ:' },
  { id: '20', prompt: 'No me ___ mentiras.', choices: ['digas', 'hablas'], target: 'digas', translation: 'Ինձ սուտ մի՛ ասա:' }
];

export const IMAGES = {
  Pedro: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop'
};
