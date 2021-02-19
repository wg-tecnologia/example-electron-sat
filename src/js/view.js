const edge = require("electron-edge-js");
const path = require("path");
const $ = require('jquery');

const chaveAC = "RVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWkdsbGEwMDBVMFY0YlU1R1ZreGhXR3hoV2tFOVBRRVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWWkdsbG=";
const dadosVenda = `<?xml version='1.0' encoding='UTF-8'?><CFe><infCFe versaoDadosEnt="0.07"><ide><CNPJ>11111111111111</CNPJ><signAC>RVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWkdsbGEwMDBVMFY0YlU1R1ZreGhXR3hoV2tFOVBRRVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWWkdsbG=</signAC><numeroCaixa>001</numeroCaixa></ide><emit><CNPJ>11111111111111</CNPJ><IE>111111111111</IE><IM>123123</IM><cRegTribISSQN>5</cRegTribISSQN><indRatISSQN>S</indRatISSQN></emit><dest></dest><det nItem="1"><prod><cProd>30015</cProd><xProd>PRODUTO TESTE</xProd><NCM>84099118</NCM><CFOP>5405</CFOP><uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>20.000</vUnCom><indRegra>A</indRegra><obsFiscoDet xCampoDet="Cod. CEST"><xTextoDet>999999999</xTextoDet></obsFiscoDet></prod><imposto><ICMS><ICMS40><Orig>0</Orig><CST>60</CST></ICMS40></ICMS><PIS><PISNT><CST>04</CST></PISNT></PIS><COFINS><COFINSNT><CST>04</CST></COFINSNT></COFINS></imposto></det><det nItem="2"><prod><cProd>TESTE</cProd><xProd>TESTE DE COMPRA</xProd><NCM>84099118</NCM><CFOP>5405</CFOP><uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>20.000</vUnCom><indRegra>A</indRegra><obsFiscoDet xCampoDet="Cod. CEST"><xTextoDet>999999999</xTextoDet></obsFiscoDet></prod><imposto><vItem12741>7.31</vItem12741><ICMS><ICMS40><Orig>0</Orig><CST>60</CST></ICMS40></ICMS><PIS><PISNT><CST>04</CST></PISNT></PIS><COFINS><COFINSNT><CST>04</CST></COFINSNT></COFINS></imposto></det><total></total><pgto><MP><cMP>99</cMP><vMP>40.00</vMP><cAdmC>999</cAdmC></MP></pgto><infAdic><infCpl>MD-5:455742D1E15C371BCD8C6556525BAE93 ::: OBRIGADO PELA PREFERENCIA ::: VOLTE SEMPRE ::: TRIB APROX RS:7.31 FED. RS:0.00 EST. RS0.00 MUN. FONTE: IBPT/FECOMERCIO SP</infCpl></infAdic></infCFe></CFe>`;

const obterVersao = () => {
  try {
    let versaoDll;
    var buscarVersao = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkVersaoDllSat'
    });

    buscarVersao(null, (error, result) => {
      if (error) return error;
      versaoDll = result;
    });
    return versaoDll;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const obterSessao = () => {
  try {
    let sessao;
    var gerarSessao = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkGerarSessao'
    });

    gerarSessao(null, (error, result) => {
      if (error) return error;
      sessao = result;
      sessaoInicial = result;
    });
    return sessao;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const encontrarSATDll = () => {
  try {
    let existeSATDll
    var existeDll = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'EncontrouDllSAT'
    });

    existeDll(null, (error, result) => {
      if (error) return error;
      if (Boolean(result)) {
        existeSATDll = "Encontrou Dll";
      } else {
        existeSATDll = "Dll não encontrada"
      }
    });
    return existeSATDll
  } catch (error) {
    console.log(error)
    return error;
  }
}

const consultarSat = () => {
  try {
    let consultaSat;
    let sessao = obterSessao();
    var consultaSAT = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkConsultarSat'
    });

    consultaSAT(sessao, (error, result) => {
      if (error) {
        consultaSat = error;
      } else {
        consultaSat = result;
      }
    });
    return consultaSat
  } catch (error) {
    console.log(error)
    return error;
  }
}

const ativarSat = () => {
  try {
    let ativaSat;
    let sessao = obterSessao();
    var ativacaoSAT = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkAtivarSat'
    });

    var payload = {
      numeroSessao: sessao,
      tipoCertificado: 1,
      codigoDeAtivacao: '123456',
      cnpj: '11111111111111',
      cUf: 35,
    }

    ativacaoSAT(payload, (error, result) => {
      if (error) {
        ativaSat = error;
      } else {
        ativaSat = result;
      }
    });
    return ativaSat
  } catch (error) {
    console.log(error)
    return error;
  }
}

const associarSat = () => {
  try {
    let associaSat;
    let sessao = obterSessao();
    var associacaoSAT = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkAssociarAssinatura'
    });

    var payload = {
      numeroSessao: sessao,
      codigoDeAtivacao: '123456',
      cnpjValue: '1111111111111190185847000180',
      assinaturaCnpj: chaveAC,
    }

    associacaoSAT(payload, (error, result) => {
      if (error) {
        associaSat = error;
      } else {
        associaSat = result;
      }
    });
    return associaSat
  } catch (error) {
    console.log(error)
    return error;
  }
}

const consultarOperacaoSat = () => {
  try {
    let consultaOperacao;
    let sessao = obterSessao();
    var consultaOperacaoSAT = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkConsultarStatusOperacional'
    });

    var payload = {
      numeroSessao: sessao,
      codigoDeAtivacao: '123456',
    }

    consultaOperacaoSAT(payload, (error, result) => {
      if (error) {
        consultaOperacao = error;
      } else {
        consultaOperacao = result;
      }
    });
    return consultaOperacao
  } catch (error) {
    console.log(error)
    return error;
  }
}

const enviarDadosVenda = () => {
  try {
    let dadosEnviados;
    let sessao = obterSessao();
    var enviarVenda = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkEnviarDadosVenda'
    });

    var payload = {
      numeroSessao: sessao,
      codigoDeAtivacao: '123456',
      dadosVenda: dadosVenda,
    }

    enviarVenda(payload, (error, result) => {
      if (error) {
        dadosEnviados = error;
      } else {
        dadosEnviados = result;
      }
    });
    return dadosEnviados
  } catch (error) {
    console.log(error)
    return error;
  }
}

const cancelarUltimaVenda = () => {
  try {
    let vendaCancelada;
    let sessao = obterSessao();
    var cancelarVenda = edge.func({
      assemblyFile: path.resolve(__dirname, "dlls", 'SatCfe.dll'),
      typeName: 'SatCfe.Core.CommunicationDll',
      methodName: 'WorkCancelarUltimaVenda'
    });

    var payload = {
      numeroSessao: sessao,
      codigoDeAtivacao: '123456',
      chave: 'CFe11087746478373757726265545868587463856478463',
      dadosCancelamento: `<CFeCanc><infCFe chCanc="CFe${$('#click-chave-acesso').val()}"><ide><CNPJ>90185847000180</CNPJ><signAC>RVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWkdsbGEwMDBVMFY0YlU1R1ZreGhXR3hoV2tFOVBRRVlHYkYzcytsZFdiekM4SExmNFVLaXlaZFJWbEhZa1l6Y3l0c1pGZGlla000U0V4bU5GVkxhWGxhWkFSVmxIWWtZemN5dHNaRmRpZWtNNFNFeG1ORlZMYVhsYVpGSldiRWhaYTFsNlkzbDBjMXBHWWkdsbG=</signAC><numeroCaixa>123</numeroCaixa></ide><emit></emit><dest></dest><total></total></infCFe></CFeCanc>`,
    }

    cancelarVenda(payload, (error, result) => {
      if (error) {
        vendaCancelada = error;
      } else {
        vendaCancelada = result;
      }
    });
    return vendaCancelada
  } catch (error) {
    console.log(error)
    return error;
  }
}

$('#versaobtn').on('click', () => {
  $('#click-versao').val(obterVersao)
})

$('#sessaobtn').on('click', () => {
  $('#click-sessao').val(obterSessao)
})

$('#existebtn').on('click', () => {
  $('#click-existe-sat').val(encontrarSATDll)
})

$('#consultabtn').on('click', () => {
  $('#click-consulta').val(consultarSat)
})

$('#ativarbtn').on('click', () => {
  $('#click-ativar').val(ativarSat)
})

$('#associarbtn').on('click', () => {
  $('#click-associar').val(associarSat)
})

$('#consultaoperacaobtn').on('click', () => {
  $('#click-consulta-operacao').val(consultarOperacaoSat)
})

$('#enviarvendabtn').on('click', () => {
  const infoEnvio = enviarDadosVenda()
  const info = infoEnvio.split('|')
  $('#click-enviar-venda1').val(`Sessão: ${info[1]}`)
  $('#click-enviar-venda2').val(`EEEEE (Cód. SAT): ${info[2]}`)
  $('#click-enviar-venda3').val(`CCCC (Cód. Erros): ${info[3]}`)
  $('#click-enviar-venda4').val(`Mensagem: ${info[4]}`)
  $('#click-enviar-venda5').val(`Base64: ${info[7]}`)
  $('#click-enviar-venda6').val(`Hora Emissão: ${info[8]}`)
  $('#click-enviar-venda7').val(`Chave de Acesso: ${info[9]}`)
  $('#click-enviar-venda8').val(`Valor: ${info[10]}`)
  $('#click-enviar-venda9').val(`CPF / CNPJ Cliente: ${info[11]}`)
  $('#click-enviar-venda0').val(`QRCode: ${info[12]}`)
})

$('#cancelarvendabtn').on('click', () => {
  $('#click-cancelar-venda').val(cancelarUltimaVenda)
})