package co.mz.uem.dawt2.service;

import co.mz.uem.dawt2.model.Solicitacao;
import co.mz.uem.dawt2.repository.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitacaoService {
    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public Solicitacao criarSolicitacao(Solicitacao solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }

    public List<Solicitacao> listarSolicitacoesPorRestaurante(Long restauranteId) {
        return solicitacaoRepository.findByRestauranteId(restauranteId);
    }
}
