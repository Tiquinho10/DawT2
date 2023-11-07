package co.mz.uem.dawt2.controller;

import co.mz.uem.dawt2.model.Avaliacao;
import co.mz.uem.dawt2.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {
    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping("/{restauranteId}")
    public List<Avaliacao> listarAvaliacoesPorRestaurante(@PathVariable Long restauranteId) {
        return avaliacaoService.listarAvaliacoesPorRestaurante(restauranteId);
    }

    @PostMapping("/{restauranteId}")
    public Avaliacao adicionarAvaliacao(@PathVariable Long restauranteId, @RequestBody Avaliacao avaliacao) {
        return avaliacaoService.adicionarAvaliacao(restauranteId, avaliacao);
    }

    @PutMapping("/{id}")
    public Avaliacao atualizarAvaliacao(@PathVariable Long id, @RequestBody Avaliacao avaliacao) {
        return avaliacaoService.atualizarAvaliacao(id, avaliacao);
    }

    @DeleteMapping("/{id}")
    public void excluirAvaliacao(@PathVariable Long id) {
        avaliacaoService.excluirAvaliacao(id);
    }
}

