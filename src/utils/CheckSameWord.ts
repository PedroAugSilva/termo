type ValuesCheckTypes = Array<{
   color: string;
   status: string
}>


const validadorDoJogoTermo = (word: string, valuesInputs: string[]) => {

  let valuesCheck: ValuesCheckTypes = [];
  
  for (var i: number = 0; i < word.length; i++) {

    if (valuesInputs[i] === word.split("")[i]) {

      // verifica se a letra digitada esta no lugar certo
      valuesCheck.length > 0
        ? (valuesCheck = [...valuesCheck,{ color: "#3aa394", status: 'certo'}])
        : (valuesCheck = [{ color: "#3aa394", status: 'certo'}]);

    // eslint-disable-next-line no-loop-func 
    } else if (word.split("").find((word) => word === valuesInputs[i])) {

      // verificando se a letra digitada esta na palavra
      valuesCheck.length > 0
        ? (valuesCheck = [...valuesCheck, { color: "#d3ad69", status: 'possui'}])
        : (valuesCheck = [{ color: "#d3ad69", status: 'possui'}]);

    } else {

      //verificando se a letra digitada NAO esta na palavra
      valuesCheck.length > 0
        ? (valuesCheck = [...valuesCheck, { color: "#312a2c", status: 'errado'}])
        : (valuesCheck = [{ color: "#312a2c", status: 'errado'}]);

    }
  }
  return valuesCheck;
};

export default validadorDoJogoTermo;
