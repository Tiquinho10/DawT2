package co.mz.uem.dawt2.controller;

import co.mz.uem.dawt2.model.Restaurante;
import co.mz.uem.dawt2.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {
    @Autowired
    private RestauranteService restauranteService;

    @GetMapping
    public List<Restaurante> listarRestaurantes() {
        return restauranteService.listarRestaurantes();
    }

    @PostMapping
    public Restaurante adicionarRestaurante(@RequestBody Restaurante restaurante) {
        return restauranteService.adicionarRestaurante(restaurante);
    }

    @PutMapping("/{id}")
    public Restaurante atualizarRestaurante(@PathVariable Long id, @RequestBody Restaurante restaurante) {
        return restauranteService.atualizarRestaurante(id, restaurante);
    }

    @DeleteMapping("/{id}")
    public void excluirRestaurante(@PathVariable Long id) {
        restauranteService.excluirRestaurante(id);
    }
}

