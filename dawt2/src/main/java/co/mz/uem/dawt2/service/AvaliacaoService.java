package co.mz.uem.dawt2.service;

import co.mz.uem.dawt2.model.Avaliacao;
import co.mz.uem.dawt2.model.Restaurante;
import co.mz.uem.dawt2.repository.AvaliacaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private RestauranteService restauranteService;

    public List<Avaliacao> listarAvaliacoesPorRestaurante(Long restauranteId) {
        return avaliacaoRepository.findByRestauranteId(restauranteId);
    }

    public Avaliacao adicionarAvaliacao(Long restauranteId, Avaliacao avaliacao) {
        Restaurante restaurante = restauranteService.buscarRestaurantePorId(restauranteId);
        avaliacao.setRestaurante(restaurante);
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao atualizarAvaliacao(Long id, Avaliacao avaliacao) {
        if (avaliacaoRepository.existsById(id)) {
            avaliacao.setId(id);
            return avaliacaoRepository.save(avaliacao);
        } else {
            throw new EntityNotFoundException("Avaliação não encontrada com o ID: " + id);
        }
    }

    public void excluirAvaliacao(Long id) {
        avaliacaoRepository.deleteById(id);
    }
}

