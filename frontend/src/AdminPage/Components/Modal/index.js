import styles from './modal.module.css'
export function MyModal({close}){

    return(
        
        <div className={styles.modalBg}>
        <div className={styles.modal}>

           

             <input id="id" name="id" type="hidden" /> 
             <h2 className="caption"></h2>

            <div className={styles.inputControl}> 
                <label htmlFor="nome">Nome</label>
                <input id="nome" name="nome" type="text" required />
                <div className={styles.error}></div>
            </div>
            <div className={styles.inputControl}>
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" name="telefone" type="text" required />
                <div className={styles.error}></div>
            </div>
            <div className={styles.inputControl}>
                <label htmlFor="endereco">Endereco</label>
                <input id="endereco" name="endereco" type="text"  required />
                <div className={styles.error}></div>
            </div>

            <div className={styles.inputControl}>
                <label htmlFor="sexo">Sexo</label>
                <select id="sexo" name="sexo" required="">
                    <option value="0" > Selecione o sexo</option>
                    <option value="F">Feminino</option>  
                    <option value="M">Masculino</option>  
                </select>
                <div className={styles.error}></div>
            </div>       


            <button id="submit">enviar</button>

            <button onClick={close} className={styles.closeBtn}>x</button>

        </div>
        </div>
    )
}