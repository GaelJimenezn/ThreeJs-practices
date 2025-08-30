using UnityEngine;

public class GameManager : MonoBehaviour
{
    // 1. Instancia estática
    public static GameManager Instance { get; private set; }

    void Awake()
    {
        // 2. Verifica si ya existe una instancia
        if (Instance == null)
        {
            Instance = this;         // Asigna esta instancia
            DontDestroyOnLoad(gameObject); // Hace que no se destruya al cambiar de escena
        }
        else
        {
            Destroy(gameObject);     // Si ya hay una instancia, destruye este objeto duplicado
        }
    }

    // Ejemplo de función pública global
    public void SayHello()
    {
        Debug.Log("¡Hola desde GameManager Singleton!");
    }
}
