useEffect(() => {
  // Pega a sessão inicial
  const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setSession(session)
  }

  // Escuta mudanças de autenticação
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  getSession()

  // Limpeza
  return () => {
    subscription.unsubscribe()
  }
}, [])