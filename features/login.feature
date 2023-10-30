Feature: Login

  Scenario: Fazendo login com credenciais válidas
     Given Estou na página de login
     When Eu insiro credenciais válidas
     Then Eu deveria ser levado ao dashboard
