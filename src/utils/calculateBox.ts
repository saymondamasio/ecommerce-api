interface Cart {
  height: number;
  width: number;
  length: number;
  weight: number;
  area?: number;
}

const MIN_LARGURA = 11;
const MAX_LARGURA = 105;

const MIN_ALTURA = 2;
const MAX_ALTURA = 105;

const MIN_COMPRIMENTO = 16;
const MAX_COMPRIMENTO = 105;

const MIN_SOMA_CLA = 29;
const MAX_SOMA_CLA = 200;

export function calculateBox(cart: Cart[]) {
  const _cart = cart.map((item) => {
    const newHeight = Math.min(item.height, item.length, item.width);
    const newLength = Math.max(item.height, item.length, item.width);
    //ordernar os valores
    const _temp = [item.height, item.length, item.width].sort((a, b) => a - b);
    item.weight = _temp[1];
    item.length = newLength;
    item.height = newHeight;
    item.area = item.width * item.length;
    return item;
  });

  _cart.sort((a, b) => a.area - b.area);

  const box = {
    altura: 0 /* altura final da caixa */,
    largura: 0 /* largura */,
    comprimento: 0 /* ... */,
    qtd_itens: 0 /* qtd de itens dentro da caixa */,
    message: null /* caso erro guarda mensagem */,
    volume: 0 /* capacidade total de armazenamento da caixa */,
    volume_itens: 0 /* volume armazenado */,
    volume_vazio: 0 /* volume livre */,
    comprimento_remanescente: 0,
    largura_remanescente: 0,
    altura_remanescente: 0,
  };

  _cart.forEach((item) => {
    box.qtd_itens += 1;

    box.volume_itens += item.height * item.length * item.width;

    if (
      box.comprimento_remanescente >= item.length &&
      box.largura_remanescente >= item.width
    ) {
      if (item.height > box.altura_remanescente) {
        box.altura += item.height - box.altura_remanescente;
      }

      if (item.length > box.comprimento) {
        box.comprimento = item.length;
      }

      box.comprimento_remanescente = box.comprimento - item.length;

      box.largura_remanescente = box.largura_remanescente - item.width;

      box.altura_remanescente =
        item.height > box.altura_remanescente
          ? item.height
          : box.altura_remanescente;

      return;
    }

    // passo (N-1) - altura e' a variavel que sempre incrementa independente de condicao ...
    box.altura += item.height;

    // passo N - verificando se item tem dimensoes maiores que a caixa...
    if (item.width > box.largura) box.largura = item.width;

    if (item.length > box.comprimento) box.comprimento = item.length;

    // calculando volume remanescente...
    box.comprimento_remanescente = box.comprimento;
    box.largura_remanescente = box.largura - item.width;
    box.altura_remanescente = item.height;
  });

  // @opcional - calculando volume da caixa ...
  box.volume = box.altura * box.largura * box.comprimento;

  // @opcional - calculando volume vazio! Ar dentro da caixa!
  box.volume_vazio = box.volume - box.volume_itens;

  // checa se temos produtos e se conseguimos alcancar a dimensao minima ...
  if (_cart.length !== 0) {
    // verificando se dimensoes minimas sao alcancadas ...
    if (box.altura > 0 && box.altura < MIN_ALTURA) box.altura = MIN_ALTURA;
    if (box.largura > 0 && box.largura < MIN_LARGURA) box.largura = MIN_LARGURA;
    if (box.comprimento > 0 && box.comprimento < MIN_COMPRIMENTO)
      box.comprimento = MIN_COMPRIMENTO;
  }

  // verifica se as dimensoes nao ultrapassam valor maximo
  if (box.altura > MAX_ALTURA)
    box.message = 'Erro: Altura maior que o permitido.';
  if (box.largura > MAX_LARGURA)
    box.message = 'Erro: Largura maior que o permitido.';
  if (box.comprimento > MAX_COMPRIMENTO)
    box.message = 'Erro: Comprimento maior que o permitido.';

  // @nota - nao sei se e' uma regra, mas por via das duvidas esta ai
  // Soma (C+L+A)	MIN 29 cm  e  MAX 200 cm
  if (box.comprimento + box.altura + box.largura < MIN_SOMA_CLA)
    box.message = 'Erro: Soma dos valores C+L+A menor que o permitido.';

  if (box.comprimento + box.altura + box.largura > MAX_SOMA_CLA)
    box.message = 'Erro: Soma dos valores C+L+A maior que o permitido.';

  return box;
}
