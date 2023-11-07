package co.mz.uem.dawt2.service;

import co.mz.uem.dawt2.model.Menu;
import co.mz.uem.dawt2.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public Menu criarMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu atualizarMenu(Long id, Menu menu) {
        menu.setId(id);
        return menuRepository.save(menu);
    }
}
