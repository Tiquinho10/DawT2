package co.mz.uem.dawt2;

import co.mz.uem.dawt2.model.Restaurante;
import co.mz.uem.dawt2.repository.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Seed implements CommandLineRunner {
    private final RestauranteRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0){
            return;
        }

        Restaurante res1 = new Restaurante(null, "nhama", "menu", "17h-20h", "maputo");
        Restaurante res2 = new Restaurante(null, "mimos", "menu", "17h-20h", "maputo");

        repository.saveAll(List.of(res1, res2));
    }
}
