import fs from "fs"
import axios from "axios"

class User {
  constructor(username) {
    this.username = username
    this.repositories = []
    this.repositoryCount = 0
    this.forkCount = 0
    this.starCount = 0
    this.languageList = []
    this.languageTotal = 0
  }
  async init() {
    const url = "https://api.github.com/users/" + this.username
    console.log(url)
    const response = await axios.get(url)
    if (response.status === 200) {
      const url = response.data["repos_url"]
      if (url) {
        return await Promise.resolve().then(() => this.getRepositories(url))
      }
    }
    return Promise.reject()
  }
  async getRepositories(url) {
    console.log(url)
    const response = await axios.get(url)
    if (response.status !== 200) return Promise.reject()
    if ((response.data instanceof Array) === false) return Promise.reject()

    this.forkCount = 0
    this.starCount = 0
    this.repositoryCount = 0
    this.languageList.splice(0)
    this.languageTotal = 0
    for (let index = 0; index < response.data.length; index ++) {
      const repository = response.data[index]
      if (repository["fork"] === false) {
        const name = repository["name"]
        const size = repository["size"]
        const forkCount = repository["forks_count"]
        const starCount = repository["stargazers_count"]
        const languages = await Promise.resolve().then(() => this.getLanguages(repository["languages_url"]))

        Object.keys(languages).forEach(key => {
          const name = key
          const size = languages[key]
          const index = this.languageList.findIndex(language => language.name === name)
          if (index === -1) {
            this.languageList.push({ name, size })
          } else {
            this.languageList[index].size += size
          }
          this.languageTotal += size
        })
        this.languageList.forEach(language => {
          language.percentage = (language.size / this.languageTotal * 100).toFixed(2) + "%"
        })
        this.languageList.sort((a, b) => b.size - a.size)

        this.repositories.push({ name, size, forkCount, starCount, languages })
        this.forkCount += forkCount
        this.starCount += starCount
        this.repositoryCount ++
      }
    }
    return Promise.resolve()
  }
  async getLanguages(url) {
    console.log(url)
    const response = await axios.get(url)
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.resolve({})
    }
  }
}

const user = new User("coderzhaoziwei")

Promise.resolve()
.then(() => user.init())
.then(() => {
  console.log(user)
})
.then(() => {
  const content = []
  content.push(`| **Coder Zhao's Github Stats** | |`)
  content.push(`|:-:|:-:|`)
  content.push(`| Public Repositories | ${user.repositoryCount} |`)
  content.push(`| Get Stars | ${user.starCount} |`)
  content.push(`| Get Forks | ${user.forkCount} |`)
  content.push(`| | |`)
  content.push(`| **Most Used Languages** | Percentage |`)
  user.languageList.forEach(language => {
    content.push(`| ${language.name} | ${language.percentage} |`)
  })
  content.push(`| | |`)
  content.push(`| **Last Modified Date** | ${new Date().toLocaleDateString()} |`)

  fs.writeFileSync("README.md", content.join("\n"))
})
