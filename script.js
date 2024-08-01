// script.js

const trie = new Trie();

const suggestionsElement = document.getElementById('suggestions');
const wordInputElement = document.getElementById('wordInput');
const checkButton = document.getElementById('checkButton');
const resultElement = document.getElementById('result');

// Función para mostrar sugerencias
function showSuggestions(prefix) {
    suggestionsElement.innerHTML = ''; // Limpia las sugerencias anteriores
    if (prefix.length === 0) return;

    const words = getSuggestions(trie.root, prefix);
    words.forEach(word => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = word;
        li.addEventListener('click', () => {
            wordInputElement.value = word;
            resultElement.textContent = '';
            suggestionsElement.innerHTML = '';
        });
        suggestionsElement.appendChild(li);
    });
}

// Función para obtener sugerencias basadas en un prefijo
function getSuggestions(node, prefix) {
    const suggestions = [];
    let currentNode = node;

    for (const char of prefix) {
        if (!currentNode.children[char]) {
            return suggestions;
        }
        currentNode = currentNode.children[char];
    }

    findAllWords(currentNode, prefix, suggestions);
    return suggestions;
}

// Función para encontrar todas las palabras a partir de un nodo
function findAllWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
        suggestions.push(prefix);
    }

    for (const char in node.children) {
        findAllWords(node.children[char], prefix + char, suggestions);
    }
}

// Evento para verificar la palabra ingresada
checkButton.addEventListener('click', () => {
    const word = wordInputElement.value.trim();
    const isWord = trie.search(word);
    resultElement.textContent = isWord ? `'${word}' es una palabra válida.` : `'${word}' no es una palabra válida.`;
    resultElement.className = isWord ? 'text-success' : 'text-danger'; // Resaltado
});

// Evento para actualizar las sugerencias a medida que se escribe
wordInputElement.addEventListener('input', () => {
    const prefix = wordInputElement.value.trim();
    showSuggestions(prefix);
});

// Palabras de ejemplo en español para insertar en el Trie
const words = [
    "amor", "animal", "amigo", "árbol", "abajo", // Palabras con 'a'
    "bajo", "banco", "bola", "barco", "bueno", // Palabras con 'b'
    "casa", "comida", "cielo", "carro", "cuadro", // Palabras con 'c'
    "dado", "día", "diente", "dormir", "doble", // Palabras con 'd'
    "elefante", "espejo", "escuela", "elección", "escribir", // Palabras con 'e'
    "fútbol", "fuego", "flor", "fama", "falso", // Palabras con 'f'
    "gato", "grande", "gol", "garaje", "gas", // Palabras con 'g'
    "hola", "hijo", "hombre", "hotel", "huevo", // Palabras con 'h'
    "iglesia", "invierno", "idea", "imán", "instante", // Palabras con 'i'
    "jamón", "juego", "joven", "jirafa", "juguete", // Palabras con 'j'
    "kilo", "kárate", "kilómetro", "kiosco", "kilo", // Palabras con 'k'
    "lago", "lámpara", "luna", "libro", "leche", // Palabras con 'l'
    "mujer", "manzana", "mesa", "murciélago", "miel", // Palabras con 'm'
    "nube", "naranja", "niño", "nuez", "nadar", // Palabras con 'n'
    "ojo", "orquídea", "olla", "oscar", "oro", // Palabras con 'o'
    "padre", "pelota", "piedra", "pinta", "plato", // Palabras con 'p'
    "quinto", "queso", "quien", "quimica", "quitar", // Palabras con 'q'
    "ratón", "ropa", "rojo", "ratón", "receta", // Palabras con 'r'
    "sol", "sal", "silla", "sombrero", "sopa", // Palabras con 's'
    "tierra", "todo", "taza", "tarea", "tren", // Palabras con 't'
    "uña", "unidad", "usar", "uno", "urgente", // Palabras con 'u'
    "vacación", "vino", "vaso", "viento", "vaca", // Palabras con 'v'
    "wifi", "wikipedia", "wok", "web", "whisky", // Palabras con 'w'
    "xilófono", "xenón", "xenofobia", "xero", "xenón", // Palabras con 'x'
    "yoga", "yate", "yo", "yema", "yogur", // Palabras con 'y'
    "zebra", "zona", "zumo", "zorro", "zapato" // Palabras con 'z'
];

// Inserta las palabras en el Trie
words.forEach(word => trie.insert(word));
