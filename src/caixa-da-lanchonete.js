class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: "Café", valor: 3.0 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
        suco: { descricao: "Suco Natural", valor: 6.2 },
        sanduiche: { descricao: "Sanduíche", valor: 6.5 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
      };
  
      this.metodosDePagamento = {
        dinheiro: { descricao: "Dinheiro", desconto: 0.05 },
        debito: { descricao: "Débito", desconto: 0 },
        credito: { descricao: "Crédito", desconto: 0.03 },
      };
    }
  
    calcularValorDaCompra(metodoDePagamento, itens) {
      if (!this.metodosDePagamento[metodoDePagamento]){
        return "Forma de pagamento inválida!";
      }
        
      if (itens.length === 0){
        return "Não há itens no carrinho de compra!";
      } 
  
      let total = 0;
      let itensExtras = [];
      let itensPrincipais = [];
  
      for (const item of itens) {
        const [codigo, quantidade] = item.split(",");
        const menuItem = this.cardapio[codigo];
  
        if (!menuItem) {
          return "Item inválido!";
        } 
        if (quantidade <= 0) {
          return "Quantidade inválida!";
        }
  
        total += menuItem.valor * quantidade;
  
        if (["chantily", "queijo"].includes(codigo)) {
          const itemPrincipal = codigo === "chantily" ? "cafe" : "sanduiche";
          itensExtras.push(`${itemPrincipal},${quantidade}`);
        } else if (!["combo1", "combo2"].includes(codigo)) {
          itensPrincipais.push(codigo);
        }
      }
  
      for (const item of itensExtras) {
        if (!itensPrincipais.includes(item.split(",")[0])) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
  
      const desconto = this.metodosDePagamento[metodoDePagamento].desconto;
      total *= metodoDePagamento === "dinheiro" ? 1 - desconto : 1 + desconto;
  
      return `R$ ${total.toFixed(2)}`.replace(".", ",");
    }
  }
  
  export { CaixaDaLanchonete };
  